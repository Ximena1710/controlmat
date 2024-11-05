import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { PersonasDTO } from './personas-dto.model'; // Define este modelo según tu PersonasDTO en el backend

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private apiUrl = 'http://tu-dominio.com/registrar'; // Reemplaza con tu URL real

  constructor(private http: HttpClient) { }

  addPersona(persona: PersonasDTO): Observable<PersonasDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<PersonasDTO>(this.apiUrl, persona, { headers });
  }
}