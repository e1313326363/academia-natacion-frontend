import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Nivel, Instructor } from '../../../core/models';

@Component({ selector: 'app-form-clase', standalone: false,
  templateUrl: './form-clase.html', styleUrl: './form-clase.scss' })
export class FormClase implements OnInit {
  form: FormGroup; loading = false; saving = false; editId: number | null = null; error = '';
  niveles: Nivel[] = []; instructores: Instructor[] = [];

  constructor(private fb: FormBuilder, private api: ApiService,
              private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      nombre_clase:  ['', [Validators.required, Validators.maxLength(100)]],
      id_nivel:      [null, Validators.required],
      id_instructor: [null, Validators.required],
      cupo:          [15, [Validators.required, Validators.min(1), Validators.max(50)]],
    });
  }

  ngOnInit() {
    this.api.getNiveles().subscribe(n => this.niveles = n);
    this.api.getInstructores({ page: 1 }).subscribe(r => this.instructores = r.data);
    this.editId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    if (this.editId) {
      this.loading = true;
      this.api.getClase(this.editId).subscribe({ next: c => { this.form.patchValue(c); this.loading = false; }, error: () => { this.loading = false; } });
    }
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    const obs = this.editId ? this.api.updateClase(this.editId, this.form.value) : this.api.createClase(this.form.value);
    obs.subscribe({ next: () => this.router.navigate(['/clases']), error: err => { this.error = err?.error?.message || 'Error al guardar.'; this.saving = false; } });
  }
  get f() { return this.form.controls; }
}
