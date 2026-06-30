import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Estudiante, Clase } from '../../../core/models';

@Component({ selector: 'app-form-inscripcion', standalone: false,
  templateUrl: './form-inscripcion.html', styleUrl: './form-inscripcion.scss' })
export class FormInscripcion implements OnInit {
  form: FormGroup; saving = false; error = '';
  estudiantes: Estudiante[] = []; clases: Clase[] = [];

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.form = this.fb.group({
      id_estudiante:     [null, Validators.required],
      id_clase:          [null, Validators.required],
      fecha_inscripcion: [''],
      estado:            ['Activo'],
    });
  }

  ngOnInit() {
    this.api.getEstudiantes({ page: 1, per_page: 200 }).subscribe(r => this.estudiantes = r.data);
    this.api.getClases({ page: 1, per_page: 200 }).subscribe(r => this.clases = r.data);
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.api.createInscripcion(this.form.value).subscribe({
      next: () => this.router.navigate(['/inscripciones']),
      error: err => { this.error = err?.error?.message || 'Error al guardar.'; this.saving = false; }
    });
  }
  get f() { return this.form.controls; }
}
