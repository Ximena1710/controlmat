import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver'; // Librería para descargar archivos
import { RegistroConsumoService } from 'src/app/services/consumo/registro-consumo.service';
import { MaterialInsumoService } from '../../services/materiales/material-insumo.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  reportForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private reportesService: RegistroConsumoService, 
    private materialInsumoService: MaterialInsumoService
  ) {
    this.reportForm = this.fb.group({
      reportType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  generateReport() {
    if (this.reportForm.invalid) {
      return;
    }

    const { reportType, startDate, endDate } = this.reportForm.value;

    // Formatear las fechas para el formato adecuado
    const formattedStartDate = new Date(startDate).toISOString();
    const formattedEndDate = new Date(endDate).toISOString();

    if (reportType === 'document-issue-date') {
      // Llama al servicio de Inventario con las fechas
      this.materialInsumoService.findAll().subscribe(
        (materials) => {
          const csvData = this.convertToCSV(materials);
          this.downloadFile(csvData, 'Inventario', 'csv');
        },
        (error) => {
          console.error('Error al generar el reporte de inventario:', error);
        }
      );
    } else if (reportType === 'pet-name') {
      // Llama al servicio de Consumo con las fechas
      this.reportesService.getConsumos().subscribe(
        (consumos) => {
         // const reportData = JSON.stringify(consumos, null, 2); 
         const reportData = this.convertToCSV(consumos);
          this.downloadFile(reportData, 'Reporte_Consumo', 'txt');
        },
        (error) => {
          console.error('Error al generar el reporte de consumo:', error);
        }
      );
    }
  }

  // Convierte el arreglo de objetos a CSV
  private convertToCSV(data: any[]): string {
    if (!data || data.length === 0) {
      return '';
    }

    const headers = Object.keys(data[0]).join(','); // Genera las cabeceras del CSV
    const rows = data
      .map((item) => Object.values(item).join(',')) // Genera las filas
      .join('\n');

    return `${headers}\n${rows}`;
  }

  // Descarga el archivo con los datos proporcionados
  private downloadFile(data: string, filename: string, extension: string) {
    const blob = new Blob([data], { type: extension === 'csv' ? 'text/csv' : 'text/plain' });
    saveAs(blob, `${filename}.${extension}`);
  }
}
