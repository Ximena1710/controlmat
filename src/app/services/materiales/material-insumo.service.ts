import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Material {
  id_material: number;
  codigo_material: string;
  nombre_material: string;
  unidad_medida: string;
  cantidad: number;
  isEditing: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MaterialInsumoService {

  private baseUrl = 'https://controlmat-ms.onrender.com/v1/material';

  constructor(private http: HttpClient) { }

  // Método para obtener todos los materiales
  findAll(): Observable<Material[]> {
    const options = { withCredentials: true };
    return this.http.get<Material[]>(`${this.baseUrl}/find`, options);
  }

  // Método para guardar o actualizar un material
  saveAndUpdate(material: Material): Observable<string> {
    const options = { withCredentials: true };
    return this.http.post<string>(`${this.baseUrl}/save`, material, options);
  }

  // Método para eliminar un material
  delete(material: Material): Observable<string> {
    const options = { withCredentials: true };
    return this.http.delete<string>(`${this.baseUrl}/delete`, { body: material, ...options });
  }
}
