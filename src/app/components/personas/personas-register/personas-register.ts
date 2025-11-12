import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PersonaService } from '../../../shared/services/persona.service';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonaRequest } from '../../../shared/models/request/persona.request';
import { PersonaResponse } from '../../../shared/models/response/persona.response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personas-register',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './personas-register.html',
  styleUrl: './personas-register.scss',
  providers: [ToastrService]
})
export class PersonasRegister implements OnInit {

  private readonly personaService = inject(PersonaService);
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

  direccion = new FormControl<string>('', [
    Validators.required
  ]);

  registerForm = this.formBuilder.group({
    nombres: this.nombres,
    apellido_paterno: this.apellido_paterno,
    apellido_materno: this.apellido_materno,
    dni: this.dni,
    direccion: this.direccion
  });

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const idParam = params.get('id');
        if (idParam) {
          this.id = Number(idParam);
          this.getPersona(this.id);
        }
      }
    });
  }

  getPersona(id: number): void {
    this.personaService
      .getPersona(id)
      .subscribe({
        next: (persona: PersonaResponse) => {
          this.registerForm.patchValue(persona);
        },
        error: (error) => {
          console.error('Error fetching persona:', error);
          this.toastr.error('Error al obtener el persona, por favor consulte al administrador');
        }
      });
  }

  save(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const personaRequest = this.registerForm.getRawValue() as PersonaRequest;

    this.personaService
      .create(personaRequest)
      .subscribe({
        next: (persona: PersonaResponse) => {
          this.router.navigate(['/personas']);
          this.toastr.success('Persona creado exitosamente');
        },
        error: (error) => {
          console.error('Error creating persona:', error);
          this.toastr.error('Error al crear el persona, por favor consulte al administrador');
        }
      });
  }

  update(): void {
    this.submitted = true;

    if (this.registerForm.invalid || !this.id) {
      return;
    }

    const personaRequest = this.registerForm.getRawValue() as PersonaRequest;

    this.personaService
      .update(this.id, personaRequest)
      .subscribe({
        next: (persona: PersonaResponse) => {
          this.router.navigate(['/personas']);
          this.toastr.success('Persona actualizado exitosamente');
        },
        error: (error) => {
          console.error('Error updating persona:', error);
          this.toastr.error('Error al actualizar el persona, por favor consulte al administrador');
        }
      });
  }
}
