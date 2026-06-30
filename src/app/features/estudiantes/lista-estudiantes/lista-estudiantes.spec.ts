import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEstudiantes } from './lista-estudiantes';

describe('ListaEstudiantes', () => {
  let component: ListaEstudiantes;
  let fixture: ComponentFixture<ListaEstudiantes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaEstudiantes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEstudiantes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
