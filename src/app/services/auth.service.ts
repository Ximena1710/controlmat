import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://controlmat-ms.onrender.com/v1/usuario';
  
  constructor(private http: HttpClient) {}

  // Método de login con withCredentials
  login(credenciales: { usuario: string; clave: string }): Observable<any> {
    const options = { withCredentials: true };
    return this.http.post<any>(`${this.apiUrl}/login`, credenciales, options).pipe(
      catchError(error => {
        console.error('There was a problem with your fetch operation:', error);
        return throwError('Error al intentar iniciar sesión');
      })
    );
  }
}
