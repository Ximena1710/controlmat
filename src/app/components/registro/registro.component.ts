import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonaService } from '../../services/persona/persona.service';
import { PersonaDTO } from 'src/app/model/PersonaDTO';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private personaService: PersonaService
  ) {
    this.registrationForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      tipoDocumento: ['', [Validators.required]],
      identificacion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      securityQuestion: ['', [Validators.required]],
      securityAnswer: ['', [Validators.required]],
  });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const persona: PersonaDTO = this.mapFormToDto();
      this.personaService.addPersona(persona).subscribe(
        response => {
          console.log('Registro exitoso:', response);
          alert('Registro completado con éxito');
          this.router.navigate(['/login']); 
        },
        error => {
          console.error('Error en el registro:', error);
          alert('Ocurrió un error durante el registro. Por favor, inténtelo nuevamente.');
        }
      );
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
    }
  }

  private mapFormToDto(): PersonaDTO {
    return {
      id_persona: 0,
      cod_empleado: this.registrationForm.get('identificacion')?.value,
      nombre: this.registrationForm.get('nombre')?.value,
      apellido: this.registrationForm.get('apellido')?.value,
      tipo_documento: this.registrationForm.get('tipoDocumento')?.value,
      numero_documento: this.registrationForm.get('identificacion')?.value,
      telefono: this.registrationForm.get('telefono')?.value,
      email: this.registrationForm.get('correoElectronico')?.value,
      clave: this.registrationForm.get('password')?.value,
      fecha_creacion: new Date().toISOString(),
      fecha_vinculacion: new Date().toISOString()
    };
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
