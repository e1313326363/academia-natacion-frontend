import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEstudiante } from './form-estudiante';

describe('FormEstudiante', () => {
  let component: FormEstudiante;
  let fixture: ComponentFixture<FormEstudiante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormEstudiante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEstudiante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
