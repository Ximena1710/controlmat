import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonaDTO } from 'src/app/model/PersonaDTO';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private apiUrl = 'https://controlmat-ms.onrender.com/v1/usuario/registrar';

  constructor(private http: HttpClient) { }

  addPersona(persona: PersonaDTO): Observable<PersonaDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = {
      headers,
      withCredentials: true
    };
    return this.http.post<PersonaDTO>(this.apiUrl, persona, options);
  }
}