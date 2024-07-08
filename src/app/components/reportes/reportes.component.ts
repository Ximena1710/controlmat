import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  reportForm: FormGroup;

  constructor(private fb: FormBuilder) {
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

    const reportNames: { [key: string]: string } = {
      '':'',
      'document-issue-date': 'Inventario',
      'pet-name': 'Reporte consumo'
    };

    const reportName = reportNames[reportType];

    const reportData = `Report Type: ${reportName}\nStart Date: ${startDate}\nEnd Date: ${endDate}`;

    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportName}.txt`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
