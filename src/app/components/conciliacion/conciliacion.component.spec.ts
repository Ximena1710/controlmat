import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-conciliacion',
  templateUrl: './conciliacion.component.html',
  styleUrls: ['./conciliacion.component.css']
})
export class ConciliacionComponent implements OnInit {
  orderForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      orderNumber: ['', Validators.required],
      product: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.orderForm.valid) {
      console.log('Form Submitted', this.orderForm.value);
      // Lógica para guardar la orden
    }
  }
}
// conciliacion.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-conciliacion',
  templateUrl: './conciliacion.component.html',
  styleUrls: ['./conciliacion.component.css']
})
export class ConciliacionComponent {
  items: any[] = [
    { numeroOrden: '', lote: '', analisis: '', codigo: '', producto: '', cantidadRecibida: 0, alistamientoDestruido: 0, autorizacionesEvidencias: 0, muestras: 0, rechazo: 0, otrasPruebas: 0, consumo: 0 }
  ];
  consumoTotalGeneral: number = 0;
  rechazoTotalGeneral: number = 0;
  devolucionesTotalGeneral: number = 0;
  historial: any[] = [];

  calcularTotales() {
    let consumoTotal = 0;
    let rechazoTotal = 0;
    let devolucionesTotal = 0;

    this.items.forEach(item => {
      consumoTotal += item.consumo;
      rechazoTotal += item.rechazo;
      devolucionesTotal += (item.cantidadRecibida - item.consumo - item.rechazo);
    });

    this.consumoTotalGeneral = consumoTotal;
    this.rechazoTotalGeneral = rechazoTotal;
    this.devolucionesTotalGeneral = devolucionesTotal;
  }

  guardarDatos() {
    const fecha = new Date().toLocaleDateString();
    this.historial.push({
      fecha: fecha,
      consumoTotal: this.consumoTotalGeneral,
      rechazoTotal: this.rechazoTotalGeneral,
      devoluciones: this.devolucionesTotalGeneral
    });

    // Aquí podrías enviar los datos a una base de datos o servicio
    console.log('Datos guardados:', this.items, this.consumoTotalGeneral, this.rechazoTotalGeneral, this.devolucionesTotalGeneral);

    // Limpieza de los campos después de guardar
    this.limpiarCampos();
  }

  limpiarCampos() {
    this.items = [
      { numeroOrden: '', lote: '', analisis: '', codigo: '', producto: '', cantidadRecibida: 0, alistamientoDestruido: 0, autorizacionesEvidencias: 0, muestras: 0, rechazo: 0, otrasPruebas: 0, consumo: 0 }
    ];
    this.consumoTotalGeneral = 0;
    this.rechazoTotalGeneral = 0;
    this.devolucionesTotalGeneral = 0;
  }
}

