import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsignacionRolesService } from 'src/app/services/usuariorol/asignacion-roles.service';

@Component({
  selector: 'app-asignacion-roles',
  templateUrl: './asignacion-roles.component.html',
  styleUrls: ['./asignacion-roles.component.css'],
})
export class AsignacionRolesComponent implements OnInit {
  roleAssignmentForm: FormGroup; // Formulario reactivo
  showRoleSelection = false; // Controla la visualización de la selección de roles
  rolesData: any[] = []; // Datos obtenidos del backend

  constructor(private fb: FormBuilder, private usuarioRolService: AsignacionRolesService) {
    // Inicialización del formulario
    this.roleAssignmentForm = this.fb.group({
      identificacion: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchRoles(); // Cargar los roles al iniciar el componente
  }

  /**
   * Carga todos los roles asignados desde el backend
   */
  fetchRoles() {
    this.usuarioRolService.getRoles().subscribe({
      next: (data) => {
        this.rolesData = data;
      },
      error: (err) => {
        alert('Error al obtener los roles: ' + err.message);
      },
    });
  }

  /**
   * Valida si el usuario está activo
   */
  checkUserActivation() {
    const identificacion = this.roleAssignmentForm.get('identificacion')?.value;

    // Simula validación de activación del usuario
    const isActive = !!identificacion; // Aquí podrías hacer una consulta al backend si es necesario

    if (isActive) {
      this.showRoleSelection = true; // Muestra la selección de rol si está activo
    } else {
      alert('El usuario no está activo. No se puede asignar un rol.');
    }
  }

  /**
   * Valida el formulario y asigna un rol al usuario
   */
  validateUserAndAssignRole() {
    if (this.roleAssignmentForm.valid) {
      const identificacion = this.roleAssignmentForm.get('identificacion')?.value;
      const rol = this.roleAssignmentForm.get('rol')?.value;

      const roleData = {
        numeroDocumento: identificacion,
        rol: rol,
      };

      this.usuarioRolService.saveRole(roleData).subscribe({
        next: (message) => {
          alert(message);
          this.fetchRoles(); // Actualiza la lista de roles
          this.roleAssignmentForm.reset(); // Resetea el formulario
          this.showRoleSelection = false;
        },
        error: (err) => {
          alert('Error al asignar el rol: ' + err.message);
        },
      });
    } else {
      alert('Por favor complete todos los campos del formulario.');
    }
  }

  /**
   * Edita un rol (implementación futura)
   */
  editRole(idUsuario: number) {
    alert(`Editar usuario con ID: ${idUsuario}`);
    // Aquí podrías implementar una funcionalidad para editar roles
  }

  /**
   * Elimina un rol asignado
   */
  deleteRole(idUsuario: number) {
    this.usuarioRolService.deleteRole(idUsuario).subscribe({
      next: (message) => {
        alert(message);
        this.fetchRoles(); // Actualiza la lista después de eliminar
      },
      error: (err) => {
        alert('Error al eliminar el rol: ' + err.message);
      },
    });
  }

  formatFecha(fechaString: any): string {  
    const dateParts = fechaString;
    const fecha = new Date(
      dateParts[0], 
      dateParts[1] - 1,
      dateParts[2],
      dateParts[3],
      dateParts[4],
      dateParts[5],
      dateParts[6] / 1000000
    );
  
    return fecha.toLocaleDateString();
  }
}
