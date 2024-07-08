import { Component } from '@angular/core';

interface Consumo {
  idRegistro: number;
  nombreMaterial: string;
  nombreProducto: string;
  usuario: string;
  cantidadUsada: number;
  adiciones: number;
  devoluciones: number;
  materialRechazado: number;
  isEditing: boolean;
}								

@Component({
  selector: 'app-registro-consumo',
  templateUrl: './registro-consumo.component.html',
  styleUrls: ['./registro-consumo.component.css']
})
export class RegistroConsumoComponent {
  consumos: Consumo[] = [
    {
      idRegistro: 1,
      nombreMaterial: 'ACETAMINOFEN JARABE',
      nombreProducto: 'ACETAMINOFEN',
      usuario: 'usuario1',
      cantidadUsada: 22400,
      adiciones: 0,
      devoluciones: 0,
      materialRechazado: 0,
      isEditing: false
    },
    {
      idRegistro: 2,
      nombreMaterial: 'BOTELLAS PET',
      nombreProducto: 'SUERO NIÑOS',
      usuario: 'usuario1',
      cantidadUsada: 16000,
      adiciones: 100,
      devoluciones: 0,
      materialRechazado: 0,
      isEditing: false
    },
    {
      idRegistro: 3,
      nombreMaterial: 'CAJA DE EMPAQUE',
      nombreProducto: 'TABLETAS',
      usuario: 'usuario1',
      cantidadUsada: 900,
      adiciones: 200,
      devoluciones: 22,
      materialRechazado: 13,
      isEditing: false
    }
  ];

  newConsumo: Consumo = {
    idRegistro: 0,
    nombreMaterial: '',
    nombreProducto: '',
    usuario: '',
    cantidadUsada: 0,
    adiciones: 0,
    devoluciones: 0,
    materialRechazado: 0,
    isEditing: false
  };

  termBusqueda: string = '';

  editConsumo( consumo: Consumo): void {
    consumo.isEditing = true;
  }

  saveConsumoWhenIsAdd(): void {
    if (this.newConsumo.nombreMaterial
      && this.newConsumo.nombreProducto
      && this.newConsumo.usuario
      && this.newConsumo.cantidadUsada
      && this.newConsumo.adiciones
      && this.newConsumo.devoluciones
      && this.newConsumo.materialRechazado) {

      this.consumos.push({ ...this.newConsumo, idRegistro: this.consumos.length + 1 });
      this.newConsumo = {
        idRegistro: 0,
        nombreMaterial: '',
        nombreProducto: '',
        usuario: '',
        cantidadUsada: 0,
        adiciones: 0,
        devoluciones: 0,
        materialRechazado: 0,
        isEditing: false
      };
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  saveConsumo(consumo: Consumo): void {
    consumo.isEditing = false;
    console.log('Material guardado:', consumo);
  }

  deleteConsumo(consumo: Consumo): void {
    this.consumos = this.consumos.filter(m => m.idRegistro !== consumo.idRegistro);
  }
}
