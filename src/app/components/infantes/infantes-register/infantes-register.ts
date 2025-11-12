import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InfanteService } from '../../../shared/services/infante.service';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InfanteRequest } from '../../../shared/models/request/infante.request';
import { InfanteResponse } from '../../../shared/models/response/infante.response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-infantes-register',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './infantes-register.html',
  styleUrl: './infantes-register.scss',
  providers: [ToastrService]
})
export class InfantesRegister implements OnInit {

  private readonly infanteService = inject(InfanteService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  submitted = false;
  id?: number;

  nombres = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50)
  ]);

  apellido_paterno = new FormControl<string>('', [
    Validators.required
  ]);

   apellido_materno = new FormControl<string>('', [
    Validators.required
  ]);

  dni = new FormControl<string>('', [
  Validators.required,
  Validators.pattern(/^\d{8}$/)
  ]);

  fecha_nacimiento = new FormControl('', [
  Validators.required
]);

  registerForm = this.formBuilder.group({
    nombres: this.nombres,
    apellido_paterno: this.apellido_paterno,
    apellido_materno: this.apellido_materno,
    dni: this.dni,
    fecha_nacimiento: this.fecha_nacimiento
  });

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const idParam = params.get('id');
        if (idParam) {
          this.id = Number(idParam);
          this.getInfante(this.id);
        }
      }
    });
  }

getInfante(id: number): void {
  this.infanteService.getInfante(id).subscribe({
    next: (infante: InfanteResponse) => {

      const fechaFormateada = infante.fecha_nacimiento?.split('T')[0];

      this.registerForm.patchValue({
        nombres: infante.nombres,
        apellido_paterno: infante.apellido_paterno,
        apellido_materno: infante.apellido_materno,
        dni: infante.dni,
        fecha_nacimiento: fechaFormateada
      });
    },
    error: (error) => {
      console.error('Error fetching infante:', error);
      this.toastr.error('Error al obtener el infante, por favor consulte al administrador');
    }
  });
}


  save(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const infanteRequest = this.registerForm.getRawValue() as InfanteRequest;

    if (infanteRequest.fecha_nacimiento) {
      infanteRequest.fecha_nacimiento = `${infanteRequest.fecha_nacimiento}T00:00:00`;
    }
    this.infanteService
      .create(infanteRequest)
      .subscribe({
        next: (infante: InfanteResponse) => {
          this.router.navigate(['/infantes']);
          this.toastr.success('Infante creado exitosamente');
        },
        error: (error) => {
          console.error('Error creating infante:', error);
          this.toastr.error('Error al crear el infante, por favor consulte al administrador');
        }
      });
  }

  update(): void {
    this.submitted = true;

    if (this.registerForm.invalid || !this.id) {
      return;
    }

    const infanteRequest = this.registerForm.getRawValue() as InfanteRequest;

    if (infanteRequest.fecha_nacimiento) {
    infanteRequest.fecha_nacimiento = `${infanteRequest.fecha_nacimiento}T00:00:00`;
    }
    this.infanteService
      .update(this.id, infanteRequest)
      .subscribe({
        next: (infante: InfanteResponse) => {
          this.router.navigate(['/infantes']);
          this.toastr.success('Infante actualizado exitosamente');
        },
        error: (error) => {
          console.error('Error updating infante:', error);
          this.toastr.error('Error al actualizar el infante, por favor consulte al administrador');
        }
      });
  }
}
