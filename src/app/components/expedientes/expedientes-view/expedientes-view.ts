import { Component, inject, OnInit } from '@angular/core';
import { ExpedienteService } from '../../../shared/services/expediente.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExpedienteResponse } from '../../../shared/models/response/expediente.response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expedientes-view',
  imports: [CommonModule, RouterLink],
  templateUrl: './expedientes-view.html',
  styleUrl: './expedientes-view.scss'
})
export class ExpedientesView implements OnInit {

  private readonly expedienteService = inject(ExpedienteService);
  private readonly activatedRoute = inject(ActivatedRoute);

  id!: number;
  expediente!: ExpedienteResponse;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        this.id = Number(id);
        if (id) {
          this.loadExpediente(this.id);
        }
      }
    })
  }

  loadExpediente(id: number): void {
    this.expedienteService
      .getExpedienteById(id)
      .subscribe({
        next: (expediente: ExpedienteResponse) => {
          this.expediente = expediente;
        },
        error: (e) => console.error('Error expediente by id', e)
      })
  }
}
