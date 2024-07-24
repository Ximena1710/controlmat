import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  private baseUrl = 'http://localhost:8080/v1/material';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.baseUrl}/find`);
  }

  saveAndUpdate(material: Material): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/save`, material);
  }

  delete(material: Material): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete`, { body: material });
  }
}
