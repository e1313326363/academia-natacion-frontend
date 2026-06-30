import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAsistencias } from './lista-asistencias';

describe('ListaAsistencias', () => {
  let component: ListaAsistencias;
  let fixture: ComponentFixture<ListaAsistencias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaAsistencias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAsistencias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
