import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistroConsumoService {
  private apiUrl = 'https://controlmat-ms.onrender.com/v1/consumo';

  constructor(private http: HttpClient) {}

  // Obtener todos los consumos
  getConsumos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/find`);
  }

  // Crear o actualizar un consumo
  saveConsumo(consumo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`, consumo);
  }

  // Actualizar un consumo existente
  updateConsumo(consumo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`, consumo);
  }

  // Eliminar un consumo
  deleteConsumo(consumo: any): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/delete`, {
      body: consumo,
    });
  }
}
