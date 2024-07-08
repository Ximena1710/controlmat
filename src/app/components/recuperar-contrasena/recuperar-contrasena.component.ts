import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent {
  recoveryForm: FormGroup;
  showNewPasswordFields = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.recoveryForm = this.fb.group({
      identificacion: ['', Validators.required],
      securityQuestion: ['', Validators.required],
      securityAnswer: ['', Validators.required],
      newPassword: [''],
      confirmNewPassword: ['']
    });
  }

  validateAnswer() {
    const correctAnswer = true;

    if (correctAnswer) {
      this.showNewPasswordFields = true;
      this.recoveryForm.get('newPassword')?.setValidators(Validators.required);
      this.recoveryForm.get('confirmNewPassword')?.setValidators(Validators.required);
      this.recoveryForm.updateValueAndValidity();
    } else {
      alert('Respuesta incorrecta. Intente de nuevo.');
    }
  }

  onSubmit() {
    if (this.recoveryForm.valid) {
      const newPassword = this.recoveryForm.get('newPassword')?.value;
      const confirmNewPassword = this.recoveryForm.get('confirmNewPassword')?.value;

      if (newPassword !== confirmNewPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }

      console.log('Formulario válido', this.recoveryForm.value);
    }
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}