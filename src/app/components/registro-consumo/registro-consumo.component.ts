  import { Component, OnInit } from '@angular/core';
  import { RegistroConsumoService } from 'src/app/services/consumo/registro-consumo.service';
  
  interface Material {
    idMaterial: number;
    nombreMaterial: string;
    codigoMaterial: string;
    cantidad: number;
    unidadMedida: string;
  }
  
  interface Producto {
    idProducto: number;
    nombreProducto: string;
  }
  
  interface Persona {
    idPersona: number;
    nombre: string;
  }
  
  interface Usuario {
    idUsuario: number;
    persona: Persona;
  }
  
  interface Consumo {
    idRegistro: number;
    materialInsumo: Material;
    producto: Producto;
    usuario: Usuario;
    cantidadUsada: number;
    adiciones: number;
    devoluciones: number;
    materialesRechazadosDesperdicio: number;
    isEditing?: boolean;
  }
  
  @Component({
    selector: 'app-registro-consumo',
    templateUrl: './registro-consumo.component.html',
    styleUrls: ['./registro-consumo.component.css'],
  })
  export class RegistroConsumoComponent implements OnInit {
    consumos: Consumo[] = [];
    materiales: Material[] = [];
    productos: Producto[] = [];
    usuarios: Usuario[] = [];
  
    newConsumo: Consumo = {
      idRegistro: 0,
      materialInsumo: { idMaterial: 0, nombreMaterial: '', codigoMaterial: '', cantidad: 0, unidadMedida: '' },
      producto: { idProducto: 0, nombreProducto: '' },
      usuario: { idUsuario: 0, persona: { idPersona : 0 ,nombre: '' } },
      cantidadUsada: 0,
      adiciones: 0,
      devoluciones: 0,
      materialesRechazadosDesperdicio: 0,
    };
  
    constructor(private consumoService: RegistroConsumoService) {}
  
    ngOnInit(): void {
      this.loadConsumos();
    }

    loadConsumos(): void {
      this.consumoService.getConsumos().subscribe(
        (data) => {
          console.log('Datos recibidos:', data); 
          this.consumos = data;
          this.materiales = [...new Map(data.map(c => [c.materialInsumo.idMaterial, c.materialInsumo])).values()];
          this.productos = [...new Map(data.map(c => [c.producto.idProducto, c.producto])).values()];
          this.usuarios = [...new Map(data.map(c => [c.usuario.idUsuario, c.usuario])).values()];
        },
        (error) => console.error('Error al cargar los consumos:', error));
      }
  
      private mapToDTO(consumo: Consumo): any {
        return {
          id_registro: consumo.idRegistro,
          id_material_insumo: consumo.materialInsumo.idMaterial,
          id_producto: consumo.producto.idProducto,
          id_usuario: consumo.usuario.idUsuario,
          cantidad_usada: consumo.cantidadUsada,
          adiciones: consumo.adiciones,
          devoluciones: consumo.devoluciones,
          materiales_rechazados_desperdicio: consumo.materialesRechazadosDesperdicio,
        };
      }
    
      saveConsumoWhenIsAdd(): void {
        if (this.isValidConsumo(this.newConsumo)) {
          // Buscar y asignar el objeto completo de producto
          const selectedProducto = this.productos.find(
            (producto) => producto.idProducto === this.newConsumo.producto.idProducto
          );
          if (selectedProducto) {
            this.newConsumo.producto = selectedProducto;
            console.log("producto " +  this.newConsumo.producto);
          }
      
          // Buscar y asignar el objeto completo de usuario
          const selectedUsuario = this.usuarios.find(
            (usuario) => usuario.idUsuario === this.newConsumo.usuario.idUsuario
          );
          if (selectedUsuario) {
            this.newConsumo.usuario = selectedUsuario;
          }
      
          const consumoDTO = this.mapToDTO(this.newConsumo);
      
          this.consumoService.saveConsumo(consumoDTO).subscribe(
            () => {
              this.loadConsumos();
              this.resetNewConsumo();
              alert('Se guardo con exito.');
            },
            (error) => console.error('Error al guardar el consumo:', error)
          );
        } else {
          alert('Por favor, complete todos los campos.');
        }
      }
      
      saveConsumo(consumo: Consumo): void {
        if (this.isValidConsumo(consumo)) {
          const selectedProducto = this.productos.find(
            (producto) => producto.idProducto === consumo.producto.idProducto
          );
          if (selectedProducto) {
            consumo.producto = selectedProducto;
          }
      
          const selectedUsuario = this.usuarios.find(
            (usuario) => usuario.idUsuario === consumo.usuario.idUsuario
          );
          if (selectedUsuario) {
            consumo.usuario = selectedUsuario;
          }
      
          const consumoDTO = this.mapToDTO(consumo);
      
          this.consumoService.updateConsumo(consumoDTO).subscribe(
            () => {
              consumo.isEditing = false;
              this.loadConsumos();
              alert("Se actualizo con exito");
            },
            (error) => console.error('Error al actualizar el consumo:', error)
          );
        } else {
          alert('Por favor, complete todos los campos.');
        }
      }
      
      private isValidConsumo(consumo: Consumo): boolean {        
        return (
          consumo.materialInsumo.idMaterial > 0 &&
          consumo.producto.idProducto > 0 &&
          consumo.usuario.idUsuario > 0 &&
          consumo.cantidadUsada > 0 &&
          consumo.adiciones > 0
        );
      }
  
    deleteConsumo(consumo: Consumo): void {
      const consumoDTO = this.mapToDTO(consumo);
      this.consumoService.deleteConsumo(consumoDTO).subscribe(
        () =>{
          this.loadConsumos();
          alert("Registro eliminado con exito");
        } 
        ,
        (error) => console.error('Error al eliminar el consumo:', error)
      );
    }
  
    editConsumo(consumo: Consumo): void {
      consumo.isEditing = true;
    }
  
    resetNewConsumo(): void {
      this.newConsumo = {
        idRegistro: 0,
        materialInsumo: { idMaterial: 0, nombreMaterial: '', codigoMaterial: '', cantidad: 0, unidadMedida: '' },
        producto: { idProducto: 0, nombreProducto: '' },
        usuario: { idUsuario: 0, persona: {idPersona: 0, nombre: '' }},
        cantidadUsada: 0,
        adiciones: 0,
        devoluciones: 0,
        materialesRechazadosDesperdicio: 0,
      };
    }
  }
  