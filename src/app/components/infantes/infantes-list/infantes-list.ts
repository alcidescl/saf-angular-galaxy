import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { InfanteService } from '../../../shared/services/infante.service';
import { InfanteResponse } from '../../../shared/models/response/infante.response';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-infantes-list',
  imports: [RouterLink, NgxDatatableModule, CommonModule],
  templateUrl: './infantes-list.html',
  styleUrl: './infantes-list.scss',
  providers: [BsModalService, ToastrService]
})
export class InfantesList implements OnInit {

  private readonly infanteService = inject(InfanteService);
  private readonly modalService = inject(BsModalService);
  private readonly toastr = inject(ToastrService);

  @ViewChild(DatatableComponent) table!: DatatableComponent<InfanteResponse>;
  infantes: InfanteResponse[] = [];
  infantesFilter: InfanteResponse[] = [];
  infante?: InfanteResponse;
  modalRef?: BsModalRef;

  totalRows = 0;
  pageNumber = 0;
  pageSize = 5;
  sortBy = 'nombres';
  sortDir = 'asc';

  nombresFilter = '';

  ngOnInit(): void {
    this.loadInfantes();
  }

  loadInfantes(): void {
    this.infanteService
      .getInfantesByPage(this.pageNumber, this.pageSize, this.sortBy, this.sortDir, this.nombresFilter)
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.infantesFilter = data.content;
            this.infantes = data.content;
            this.totalRows = data.totalElements;
          }
        },
        error: (error) => {
          console.error('Error fetching infantes:', error);
        }
      });
  }

  search(text: string) {
    this.nombresFilter = text;

    this.infantes = this.infantesFilter.filter(function (d) {
      return d.nombres.toLowerCase().indexOf(text) !== -1 || !text;
    });

    this.pageNumber = 0;
    this.table.offset = this.pageNumber;

    this.loadInfantes();
  }

  onPageChange(event: any): void {
    this.pageNumber = event.offset;
    this.loadInfantes();
  }

  onSortChange(event: any): void {
    const sort = event.sorts[0];
    this.sortBy = sort.prop;
    this.sortDir = sort.dir;
    this.loadInfantes();
  }

  deleteInfante(template: TemplateRef<void>, infante: InfanteResponse): void {
    this.modalRef = this.modalService.show(template);
    this.infante = infante;
  }

  closeModal(): void {
    this.modalRef?.hide();
  }

  confirmDelete(): void {
    if (this.infante) {
      this.infanteService
        .delete(this.infante.id)
        .subscribe({
          next: () => {
            this.infantes = this.infantes.filter(c => c.id !== this.infante!.id);
            this.toastr.success('Infante eliminado correctamente');
          },
          error: (error) => {
            console.error('Error deleting infante:', error);
            this.toastr.error('Error al eliminar el infante, consulte con soporte');
          },
        });
      this.closeModal();
    }
  }
}
