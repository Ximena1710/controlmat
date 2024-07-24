import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaterialInsumoService } from '../../services/materiales/material-insumo.service';

interface Material {
  id_material: number;
  codigo_material: string;
  nombre_material: string;
  unidad_medida: string;
  cantidad: number;
  isEditing: boolean;
}

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class InsumosComponent implements OnInit {
  materials: Material[] = [];
  allMaterials: Material[] = [];
  newMaterial: Material = {
    id_material: 0,
    codigo_material: '',
    nombre_material: '',
    unidad_medida: '',
    cantidad: 0,
    isEditing: false
  };
  isAdd: boolean = false;
  termBusqueda: string = '';

  constructor(private materialInsumoService: MaterialInsumoService, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadMaterials();
  }

  loadMaterials(): void {
    this.materialInsumoService.findAll().subscribe(materials => {
      this.materials = materials;
      this.allMaterials = [...materials];
    });
  }

  addMaterial() {
    this.isAdd = true;
  }

  editMaterial(material: Material): void {
    material.isEditing = true;
  }

  saveMaterialWhenIsAdd(): void {
    if (this.newMaterial.codigo_material && this.newMaterial.nombre_material && this.newMaterial.unidad_medida && this.newMaterial.cantidad) {
      this.materialInsumoService.saveAndUpdate(this.newMaterial).subscribe(response => {
        alert(response);
        this.isAdd = false;
        this.loadMaterials();
      });
      this.newMaterial = {
        id_material: 0,
        codigo_material: '',
        nombre_material: '',
        unidad_medida: '',
        cantidad: 0,
        isEditing: false
      };
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  saveMaterial(material: Material): void {
    material.isEditing = false;
    this.materialInsumoService.saveAndUpdate(material).subscribe(response => {
      alert(response);
      this.loadMaterials();
    });
  }

  deleteMaterial(material: Material): void {
    this.materialInsumoService.delete(material).subscribe(response => {
      alert(response);
      this.loadMaterials();
    });
  }

  insumoEncontrado() {
    if (this.termBusqueda.trim() === '') {
      this.materials = [...this.allMaterials];
    } else {
      const encontrados = this.buscarInsumo(this.termBusqueda);
      this.materials = encontrados;
    }
  }

  buscarInsumo(palabra: string): Material[] {
    palabra = palabra.toUpperCase();
    return this.allMaterials.filter(material => material.nombre_material.toUpperCase().includes(palabra));
  }
}
