import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInstructor } from './form-instructor';

describe('FormInstructor', () => {
  let component: FormInstructor;
  let fixture: ComponentFixture<FormInstructor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormInstructor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInstructor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
