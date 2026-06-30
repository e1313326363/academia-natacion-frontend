import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAsistencia } from './form-asistencia';

describe('FormAsistencia', () => {
  let component: FormAsistencia;
  let fixture: ComponentFixture<FormAsistencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAsistencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAsistencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
