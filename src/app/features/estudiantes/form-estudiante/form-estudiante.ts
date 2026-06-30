import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-form-estudiante',
  standalone: false,
  templateUrl: './form-estudiante.html',
  styleUrl: './form-estudiante.scss',
})
export class FormEstudiante implements OnInit {
  form: FormGroup;
  loading = false;
  saving = false;
  editId: number | null = null;
  error = '';

  constructor(private fb: FormBuilder, private api: ApiService,
              private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      nombre:           ['', [Validators.required, Validators.maxLength(80)]],
      fecha_nacimiento: ['', Validators.required],
      telefono:         [''],
      email:            ['', Validators.email],
    });
  }

  ngOnInit() {
    this.editId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    if (this.editId) {
      this.loading = true;
      this.api.getEstudiante(this.editId).subscribe({
        next: e => { this.form.patchValue(e); this.loading = false; },
        error: () => { this.loading = false; }
      });
    }
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    const data = this.form.value;
    const obs = this.editId
      ? this.api.updateEstudiante(this.editId, data)
      : this.api.createEstudiante(data);
    obs.subscribe({
      next: () => this.router.navigate(['/estudiantes']),
      error: err => {
        this.error = err?.error?.message || 'Error al guardar.';
        this.saving = false;
      }
    });
  }

  get f() { return this.form.controls; }
}
