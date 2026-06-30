import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPagos } from './lista-pagos';

describe('ListaPagos', () => {
  let component: ListaPagos;
  let fixture: ComponentFixture<ListaPagos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaPagos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPagos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
