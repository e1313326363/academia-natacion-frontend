import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Inscripcion } from '../../../core/models';

@Component({ selector: 'app-form-asistencia', standalone: false,
  templateUrl: './form-asistencia.html', styleUrl: './form-asistencia.scss' })
export class FormAsistencia implements OnInit {
  form: FormGroup; saving = false; error = '';
  inscripciones: Inscripcion[] = [];

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.form = this.fb.group({
      id_inscripcion: [null, Validators.required],
      fecha_clase:    ['', Validators.required],
      asistio:        ['Si', Validators.required],
    });
  }

  ngOnInit() {
    this.api.getInscripciones({ page: 1, estado: 'Activo' }).subscribe(r => this.inscripciones = r.data);
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.api.createAsistencia(this.form.value).subscribe({
      next: () => this.router.navigate(['/asistencias']),
      error: err => { this.error = err?.error?.message || 'Error al guardar.'; this.saving = false; }
    });
  }
  get f() { return this.form.controls; }
}
