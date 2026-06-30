import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInscripciones } from './lista-inscripciones';

describe('ListaInscripciones', () => {
  let component: ListaInscripciones;
  let fixture: ComponentFixture<ListaInscripciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaInscripciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaInscripciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
