import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InfanteResponse } from '../../../shared/models/response/infante.response';
import { InfanteService } from '../../../shared/services/infante.service';
import { PersonaService } from '../../../shared/services/persona.service';
import { PersonaResponse } from '../../../shared/models/response/persona.response';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExpedienteDetalleResponse } from '../../../shared/models/response/expediente-detalle.response';
import { CommonModule } from '@angular/common';
import { ExpedienteService } from '../../../shared/services/expediente.service';
import { ExpedienteRequest } from '../../../shared/models/request/expediente.request';
import { ExpedienteResponse } from '../../../shared/models/response/expediente.response';

@Component({
  selector: 'app-expedientes-register',
  imports: [RouterLink, NgxDatatableModule, ReactiveFormsModule, CommonModule],
  templateUrl: './expedientes-register.html',
  styleUrl: './expedientes-register.scss',
  providers: [BsModalService]
})
export class ExpedientesRegister implements OnInit {

  private readonly infanteService = inject(InfanteService);
  private readonly personaService = inject(PersonaService);
  private readonly modalService = inject(BsModalService);
  private readonly expedienteService = inject(ExpedienteService);
  private readonly fb = inject(FormBuilder);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);

  modalRef?: BsModalRef;
  submitted = false;
  infanteId = new FormControl<any>(null, [
    Validators.required
  ]);
  expedienteForm = this.fb.group({
    infanteId: this.infanteId
  });
  detalles: ExpedienteDetalleResponse[] = [];

  // Infantes Modal
  @ViewChild(DatatableComponent) table!: DatatableComponent<InfanteResponse>;
  infantes: InfanteResponse[] = [];
  infantesFilter: InfanteResponse[] = [];
  infanteSelected?: InfanteResponse;
  totalRows = 0;
  pageNumber = 0;
  pageSize = 5;
  sortBy = 'nombres';
  sortDir = 'asc';
  nombresFilter = '';

  // Personas Modal
  personas: PersonaResponse[] = [];
  personasFilter: PersonaResponse[] = [];
  personaSelected?: PersonaResponse;

  ngOnInit(): void {
    this.personaService
      .getPersonas()
      .subscribe({
        next: (personas: PersonaResponse[]) => {
          this.personas = personas;
          this.personasFilter = personas;
        },
        error: (error) => console.log('Error obtener personas: ', error)
      })
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

  searchInfante(text: string) {
    this.nombresFilter = text;

    this.infantes = this.infantesFilter.filter(function (infante) {
      return infante.nombres.toLowerCase().indexOf(text) !== -1 || !text;
    });

    this.pageNumber = 0;
    this.table.offset = this.pageNumber;

    this.loadInfantes();
  }

  openModalInfantes(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-xl' });
  }

  closeModalInfantes(): void {
    this.modalRef?.hide();
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

  selectInfante(row: InfanteResponse): void {
    this.infanteSelected = row;
    this.infanteId.setValue(row.id);
    this.modalRef?.hide();
  }

  closeModalPersonas(): void {
    this.modalRef?.hide();
  }

  openModalPersonas(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-xl' });
  }

  selectPersona(row: PersonaResponse) {
    this.personaSelected = row;
    this.modalRef?.hide();
  }

  searchPersona(text: string) {
    this.personas = this.personasFilter.filter(function (persona) {
      return persona.nombres.toLowerCase().indexOf(text) !== -1 || !text;
    });
  }

  addDetail(): void {
    if (!this.personaSelected) {
      this.toastr.error('El Persona es obligatorio');
      return;
    }


    this.detalles.push({
      persona: this.personaSelected,
      personaId: this.personaSelected.id

    });
  }

  removeDetail(index: number) {
    this.detalles.splice(index, 1);
  }

  generate(): void {
    this.submitted = true;

    if (this.expedienteForm.invalid) {
      return;
    }

    if (this.detalles.length == 0) {
      this.toastr.error('No hay detalles 1');
      return;
    }

    const form = {
      infanteId: this.infanteSelected?.id,
      detalles: this.detalles
    } as ExpedienteRequest;

    this.expedienteService
      .create(form)
      .subscribe({
        next: (expediente: ExpedienteResponse) => {
          this.router.navigate(['/expedientes']);
          this.toastr.success('Expediente creado correctamente');
        },
        error: (error) => console.log('Error create expediente: ', error)
      })
  }
}
