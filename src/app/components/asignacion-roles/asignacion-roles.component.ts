import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-asignacion-roles',
  templateUrl: './asignacion-roles.component.html',
  styleUrls: ['./asignacion-roles.component.css']
})
export class AsignacionRolesComponent implements OnInit {

  roleAssignmentForm: FormGroup;
  showRoleSelection = false;
  rolesData = [
    { numeroDocumento: '1234567890', idUsuario: 1, rol: 'operario-empaque', fechaAsignacion: '01/07/2023' },
    { numeroDocumento: '9876543210', idUsuario: 2, rol: 'administrador', fechaAsignacion: '02/07/2023' },
    { numeroDocumento: '5678901234', idUsuario: 3, rol: 'auxiliar-conciliacion', fechaAsignacion: '03/07/2023' }
  ];

  constructor(private fb: FormBuilder) {
    this.roleAssignmentForm = this.fb.group({
      identificacion: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  checkUserActivation() {
    const identificacion = this.roleAssignmentForm.get('identificacion')?.value;
    const isActive = true;

    if (isActive) {
      this.showRoleSelection = true;
    } else {
      alert('El usuario no está activo. No se puede asignar un rol.');
    }
  }

  validateUserAndAssignRole() {
    if (this.roleAssignmentForm.valid) {
      const rol = this.roleAssignmentForm.get('rol')?.value;
      const fechaAsignacion = new Date().toLocaleDateString();

      const roleData = {
        numeroDocumento: '2468013579',
        idUsuario: this.rolesData.length + 1, 
        rol: rol,
        fechaAsignacion: fechaAsignacion
      };

      this.rolesData.push(roleData);
      this.roleAssignmentForm.reset();
      this.showRoleSelection = false;
    } else {
      alert('Seleccione un rol válido.');
    }
  }

  editRole(idUsuario: number) {
    alert(`Editar ID de usuario ${idUsuario}`);
  }

  deleteRole(idUsuario: number) {
    this.rolesData = this.rolesData.filter(role => role.idUsuario !== idUsuario);
  }
}
