import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Inscripcion } from '../../../core/models';

@Component({ selector: 'app-form-pago', standalone: false,
  templateUrl: './form-pago.html', styleUrl: './form-pago.scss' })
export class FormPago implements OnInit {
  form: FormGroup; saving = false; error = '';
  inscripciones: Inscripcion[] = [];

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.form = this.fb.group({
      id_inscripcion: [null, Validators.required],
      monto:          ['', [Validators.required, Validators.min(0.01)]],
      fecha_pago:     [''],
      metodo_pago:    ['Efectivo', Validators.required],
      estado:         ['Pagado'],
    });
  }

  ngOnInit() {
    this.api.getInscripciones({ page: 1, estado: 'Activo' }).subscribe(r => this.inscripciones = r.data);
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    this.api.createPago(this.form.value).subscribe({
      next: () => this.router.navigate(['/pagos']),
      error: err => { this.error = err?.error?.message || 'Error al guardar.'; this.saving = false; }
    });
  }
  get f() { return this.form.controls; }
}
