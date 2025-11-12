import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PersonaResponse } from '../models/response/persona.response';
import { Observable } from 'rxjs';
import { PersonaRequest } from '../models/request/persona.request';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.api.base}/personas`;

  getPersonas(): Observable<PersonaResponse[]> {
    return this.httpClient.get<PersonaResponse[]>(this.apiUrl);
  }

  getPersonasByPage(page: number, size: number, sortBy = 'nombres', sortDir = 'asc', nombres = ''): Observable<PersonaResponse[]> {
    return this.httpClient.get<PersonaResponse[]>(`${this.apiUrl}/filter/paging`, {
      params: new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
        .set('sortBy', sortBy)
        .set('sortDir', sortDir)
        .set('nombres', nombres)
    });
  }

  getPersona(id: number): Observable<PersonaResponse> {
    return this.httpClient.get<PersonaResponse>(`${this.apiUrl}/${id}`);
  }

  create(persona: PersonaRequest): Observable<PersonaResponse> {
    return this.httpClient.post<PersonaResponse>(this.apiUrl, persona)
  }

  update(id: number, persona: PersonaRequest): Observable<PersonaResponse> {
    return this.httpClient.put<PersonaResponse>(`${this.apiUrl}/${id}`, persona);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
