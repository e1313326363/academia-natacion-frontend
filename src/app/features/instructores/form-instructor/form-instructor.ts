import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

@Component({ selector: 'app-form-instructor', standalone: false,
  templateUrl: './form-instructor.html', styleUrl: './form-instructor.scss' })
export class FormInstructor implements OnInit {
  form: FormGroup; loading = false; saving = false; editId: number | null = null; error = '';

  constructor(private fb: FormBuilder, private api: ApiService,
              private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      nombre:       ['', [Validators.required, Validators.maxLength(80)]],
      especialidad: [''],
      email:        ['', Validators.email],
    });
  }

  ngOnInit() {
    this.editId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    if (this.editId) {
      this.loading = true;
      this.api.getInstructor(this.editId).subscribe({ next: e => { this.form.patchValue(e); this.loading = false; }, error: () => { this.loading = false; } });
    }
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    const obs = this.editId ? this.api.updateInstructor(this.editId, this.form.value) : this.api.createInstructor(this.form.value);
    obs.subscribe({ next: () => this.router.navigate(['/instructores']), error: err => { this.error = err?.error?.message || 'Error al guardar.'; this.saving = false; } });
  }
  get f() { return this.form.controls; }
}
