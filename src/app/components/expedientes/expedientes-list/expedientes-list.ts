import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ExpedienteService } from '../../../shared/services/expediente.service';
import { ExpedienteResponse } from '../../../shared/models/response/expediente.response';
import { CommonModule, DatePipe } from '@angular/common';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { FormsModule } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HasRole } from '../../../shared/directives/has-role';
defineLocale('es', esLocale);

@Component({
  selector: 'app-expedientes-list',
  imports: [RouterLink, NgxDatatableModule, CommonModule, BsDatepickerModule, FormsModule, HasRole],
  templateUrl: './expedientes-list.html',
  styleUrl: './expedientes-list.scss',
  providers: [DatePipe, BsModalService, ToastrService]
})
export class ExpedientesList implements OnInit {

  private readonly expedienteService = inject(ExpedienteService);
  private readonly datePipe = inject(DatePipe);
  private readonly bsLocaleService = inject(BsLocaleService);
  private readonly modalService = inject(BsModalService);
  private readonly toastr = inject(ToastrService);

  modalRef?: BsModalRef;
  expediente?: ExpedienteResponse;

  expedientes: ExpedienteResponse[] = [];
  desdeDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  hastaDate = new Date();
  estadoFilter = '';

  ngOnInit(): void {
    this.bsLocaleService.use('es');
    this.loadExpedientes();
  }

  loadExpedientes(): void {
    const fechaDesdeString = this.datePipe.transform(this.desdeDate, 'dd-MM-yyyy') || '';
    const fechaHastaString = this.datePipe.transform(this.hastaDate, 'dd-MM-yyyy') || '';

    this.expedienteService
      .getExpedientes(fechaDesdeString, fechaHastaString, this.estadoFilter)
      .subscribe({
        next: (expedientes: ExpedienteResponse[]) => {
          if (expedientes?.length > 0) {
            this.expedientes = expedientes;
          } else {
            this.expedientes = [];
          }
        },
        error: (error) => {
          console.error('Error fetching expedientes:', error);
        }
      })
  }

  getInfantesTexto(row: any): string {
    if (!row.infantes || row.infantes.length === 0) {
      return '';
    }

    return row.infantes
      .map((i: any) =>
        [i.nombres, i.apellido_paterno, i.apellido_materno]
          .filter(Boolean)
          .join(' ')
      )
      .join('<br>');
  }



  onDesdeDateChange(value: Date): void {
    this.desdeDate = value;
    this.loadExpedientes();
  }

  onHastaDateChange(value: Date): void {
    this.hastaDate = value;
    this.loadExpedientes();
  }

  cancelarExpediente(template: TemplateRef<void>, expediente: ExpedienteResponse): void {
    this.modalRef = this.modalService.show(template);
    this.expediente = expediente;
  }

  segumientoExpediente(template: TemplateRef<void>, expediente: ExpedienteResponse): void {
    this.modalRef = this.modalService.show(template);
    this.expediente = expediente;
  }

  closeModal(): void {
    this.modalRef?.hide();
  }

  confirmarCancelar(): void {
    if (this.expediente) {
      this.expedienteService
        .cancelExpediente(this.expediente.id)
        .subscribe({
          next: (value: Boolean) => {
            if (value) {
              this.toastr.success('Expediente cancelado');
              this.loadExpedientes();
              this.modalRef?.hide();
            } else {
              this.toastr.success('El Expediente no se pudo cancelar');
            }
          },
          error: (error) => {
            console.error('Error deleting expediente:', error);
            this.toastr.error('Error al eliminar el expediente, consulte con soporte');
          }
        })
    }
  }

  confirmarSeguimiento(): void {
    if (this.expediente) {
      this.expedienteService
        .confirmStockExpediente(this.expediente.id)
        .subscribe({
          next: (value: Boolean) => {
            if (value) {
              this.toastr.success('Expediente con Stock Confirmado');
              this.loadExpedientes();
              this.modalRef?.hide();
            } else {
              this.toastr.success('El Expediente no se pudo confirmar');
            }
          },
          error: (error) => {
            console.error('Error deleting expediente:', error);
            this.toastr.error('Error al eliminar el expediente, consulte con soporte');
          }
        })
    }
  }
}
