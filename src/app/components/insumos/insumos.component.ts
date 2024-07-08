import { Component } from '@angular/core';

interface Material {
  id: number;
  codigo: string;
  nombre: string;
  unidad: string;
  cantidad: number;
  isEditing: boolean;
}

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class InsumosComponent {
  materials: Material[] = [
    { id: 1, codigo: '2002260', nombre: 'ACETAMINOMEN JARABE', unidad: 'L', cantidad: 4500, isEditing: false },
    { id: 2, codigo: '3000065', nombre: 'FCO PET INCOLORO X 60 ML', unidad: 'UN', cantidad: 1080, isEditing: false },
    { id: 3, codigo: '8912121', nombre: 'JERINGA SOLUCION INY 50ML', unidad: 'UN', cantidad: 500, isEditing: false },
    { id: 4, codigo: '2002260', nombre: 'ACETAMINOMEN JARABE', unidad: 'L', cantidad: 4500, isEditing: false },
    { id: 5, codigo: '3000065', nombre: 'FCO PET INCOLORO X 60 ML', unidad: 'UN', cantidad: 1080, isEditing: false },
    { id: 6, codigo: '8912121', nombre: 'JERINGA SOLUCION INY 50ML', unidad: 'UN', cantidad: 500, isEditing: false },
    { id: 7, codigo: '8912121', nombre: 'JERINGA SOLUCION INY 50ML', unidad: 'UN', cantidad: 500, isEditing: false }
  ];

  allMaterials: Material[] = this.materials.map(material => ({ ...material }));

  newMaterial: Material = {
    id: 0,
    codigo: '',
    nombre: '',
    unidad: '',
    cantidad: 0,
    isEditing: false
  };

  isAdd: boolean = false;
  termBusqueda: string = '';

  addMaterial() {
    this.isAdd = true;
  }

  editMaterial(material: Material): void {
    material.isEditing = true;
  }

  saveMaterialWhenIsAdd(): void {
    if (this.newMaterial.codigo && this.newMaterial.nombre && this.newMaterial.unidad && this.newMaterial.cantidad) {
      this.isAdd = false;
      this.materials.push({ ...this.newMaterial, id: this.materials.length + 1 });
      this.newMaterial = {
        id: 0,
        codigo: '',
        nombre: '',
        unidad: '',
        cantidad: 0,
        isEditing: false
      };
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  saveMaterial(material: Material): void {
    material.isEditing = false;
    console.log('Material guardado:', material);
  }

  deleteMaterial(material: Material): void {
    this.materials = this.materials.filter(m => m.id !== material.id);
  }

  insumoEncontrado() {
    if (this.termBusqueda.trim() === '') {
      this.materials = [...this.allMaterials]; 
    } else {
      const encontrados = this.buscarInsumo(this.termBusqueda);
      this.materials = encontrados;
    }
  }

  buscarInsumo(palabra: string):  Material[] {
    palabra = palabra.toUpperCase();
    return this.allMaterials.filter(material => material.nombre.toUpperCase().includes(palabra));
  }
}
