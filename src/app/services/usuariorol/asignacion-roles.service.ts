import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsignacionRolesService {
  private apiUrl = 'https://controlmat-ms.onrender.com/v1/usuariorol'; // Cambia esto por tu URL base

  constructor(private http: HttpClient) {}

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/find`);
  }

  saveRole(roleData: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/save`, roleData);
  }

  deleteRole(idUsuario: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete`, {
      body: { idUsuario },
    });
  }
}
