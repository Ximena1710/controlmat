import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/v1';
  constructor(private http: HttpClient) {}

  login(credenciales: { usuario: string; clave: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credenciales).pipe(
      catchError(error => {
        console.error('There was a problem with your fetch operation:', error);
        return throwError('Error al intentar iniciar sesión');
      })
    );
  }
}
