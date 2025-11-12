import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PersonaService } from '../../../shared/services/persona.service';
import { PersonaResponse } from '../../../shared/models/response/persona.response';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personas-list',
  imports: [RouterLink, NgxDatatableModule, CommonModule],
  templateUrl: './personas-list.html',
  styleUrl: './personas-list.scss',
  providers: [BsModalService, ToastrService]
})
export class PersonasList implements OnInit {

  private readonly personaService = inject(PersonaService);
  private readonly modalService = inject(BsModalService);
  private readonly toastr = inject(ToastrService);

  @ViewChild(DatatableComponent) table!: DatatableComponent<PersonaResponse>;
  personas: PersonaResponse[] = [];
  personasFilter: PersonaResponse[] = [];
  persona?: PersonaResponse;
  modalRef?: BsModalRef;

  totalRows = 0;
  pageNumber = 0;
  pageSize = 5;
  sortBy = 'nombres';
  sortDir = 'asc';

  nombresFilter = '';

  ngOnInit(): void {
    this.loadPersonas();
  }

  loadPersonas(): void {
    this.personaService
      .getPersonasByPage(this.pageNumber, this.pageSize, this.sortBy, this.sortDir, this.nombresFilter)
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.personasFilter = data.content;
            this.personas = data.content;
            this.totalRows = data.totalElements;
          }
        },
        error: (error) => {
          console.error('Error fetching personas:', error);
        }
      });
  }

  search(text: string) {
    this.nombresFilter = text;

    this.personas = this.personasFilter.filter(function (d) {
      return d.nombres.toLowerCase().indexOf(text) !== -1 || !text;
    });

    this.pageNumber = 0;
    this.table.offset = this.pageNumber;

    this.loadPersonas();
  }

  onPageChange(event: any): void {
    this.pageNumber = event.offset;
    this.loadPersonas();
  }

  onSortChange(event: any): void {
    const sort = event.sorts[0];
    this.sortBy = sort.prop;
    this.sortDir = sort.dir;
    this.loadPersonas();
  }

  deletePersona(template: TemplateRef<void>, persona: PersonaResponse): void {
    this.modalRef = this.modalService.show(template);
    this.persona = persona;
  }

  closeModal(): void {
    this.modalRef?.hide();
  }

  confirmDelete(): void {
    if (this.persona) {
      this.personaService
        .delete(this.persona.id)
        .subscribe({
          next: () => {
            this.personas = this.personas.filter(c => c.id !== this.persona!.id);
            this.toastr.success('Persona eliminado correctamente');
          },
          error: (error) => {
            console.error('Error deleting persona:', error);
            this.toastr.error('Error al eliminar el persona, consulte con soporte');
          },
        });
      this.closeModal();
    }
  }
}
