import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpedienteResponse } from '../models/response/expediente.response';
import { ExpedienteRequest } from '../models/request/expediente.request';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {

  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.api.base}/expedientes`;

  getExpedientes(desde: string, hasta: string, estado: string): Observable<ExpedienteResponse[]> {
    return this.httpClient.get<ExpedienteResponse[]>(`${this.apiUrl}/from-range-and-estado`, {
      params: new HttpParams()
        .set('desde', desde)
        .set('hasta', hasta)
        .set('estado', estado)
    });
  }

  getExpedienteById(id: number): Observable<ExpedienteResponse> {
    return this.httpClient.get<ExpedienteResponse>(`${this.apiUrl}/${id}`);
  }

  create(expedienteRequest: ExpedienteRequest): Observable<ExpedienteResponse> {
    return this.httpClient.post<ExpedienteResponse>(this.apiUrl, expedienteRequest);
  }

  cancelExpediente(id: number): Observable<Boolean> {
    return this.httpClient.put<Boolean>(`${this.apiUrl}/${id}/cancel`, null);
  }

  confirmStockExpediente(id: number): Observable<Boolean> {
    return this.httpClient.put<Boolean>(`${this.apiUrl}/${id}/confirm-expediente`, null);
  }
}
