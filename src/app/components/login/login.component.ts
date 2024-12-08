import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  responseData: string = "";

  constructor(private authService: AuthService,  private router: Router) {}

  onSubmit(): void {
    const credenciales = {
      usuario: this.username,
      clave: this.password
    };

    this.authService.login(credenciales).subscribe(
      (data: any) => {
        if (data == 0) {
          this.responseData = 'Usuario y/o contraseña incorrecto ';
        } else {
          this.router.navigate(['/home']);
        }
      },
      error => {
        this.responseData = error;
      }
    );
  }
}