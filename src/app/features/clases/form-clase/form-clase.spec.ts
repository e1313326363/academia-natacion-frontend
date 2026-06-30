import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormClase } from './form-clase';

describe('FormClase', () => {
  let component: FormClase;
  let fixture: ComponentFixture<FormClase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormClase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormClase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
