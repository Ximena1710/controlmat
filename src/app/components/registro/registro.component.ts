import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
    registrationForm: FormGroup;
  
    constructor(private fb: FormBuilder, private router: Router) {
      this.registrationForm = this.fb.group({
        nombre: ['', Validators.required],
        identificacion: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        correoElectronico: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        securityQuestion: ['', Validators.required],
        securityAnswer: ['', Validators.required]
      }, { validator: this.passwordMatchValidator });
    }
  
    passwordMatchValidator(form: FormGroup) {
      return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
    }
  
    onSubmit() {
      if (this.registrationForm.valid) {
        console.log('Form Submitted', this.registrationForm.value);
      } else {
        alert('Por favor, complete todos los campos obligatorios.');
      }
    }
    goBack() {
      this.router.navigate(['/login']);
    }
  }
  