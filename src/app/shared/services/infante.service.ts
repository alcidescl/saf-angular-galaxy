import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { InfanteResponse } from '../models/response/infante.response';
import { Observable } from 'rxjs';
import { InfanteRequest } from '../models/request/infante.request';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfanteService {

  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.api.base}/infantes`;

  getInfantes(): Observable<InfanteResponse[]> {
    return this.httpClient.get<InfanteResponse[]>(this.apiUrl);
  }

  getInfantesByPage(page: number, size: number, sortBy = 'nombres', sortDir = 'asc', nombres = ''): Observable<InfanteResponse[]> {
    return this.httpClient.get<InfanteResponse[]>(`${this.apiUrl}/filter/paging`, {
      params: new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
        .set('sortBy', sortBy)
        .set('sortDir', sortDir)
        .set('nombres', nombres)
    });
  }

  getInfante(id: number): Observable<InfanteResponse> {
    return this.httpClient.get<InfanteResponse>(`${this.apiUrl}/${id}`);
  }

  create(infante: InfanteRequest): Observable<InfanteResponse> {
    return this.httpClient.post<InfanteResponse>(this.apiUrl, infante)
  }

  update(id: number, infante: InfanteRequest): Observable<InfanteResponse> {
    return this.httpClient.put<InfanteResponse>(`${this.apiUrl}/${id}`, infante);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
