import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInstructores } from './lista-instructores';

describe('ListaInstructores', () => {
  let component: ListaInstructores;
  let fixture: ComponentFixture<ListaInstructores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaInstructores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaInstructores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
