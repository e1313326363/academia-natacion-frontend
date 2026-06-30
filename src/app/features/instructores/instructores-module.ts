import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstructoresRoutingModule } from './instructores-routing-module';
import { ListaInstructores } from './lista-instructores/lista-instructores';
import { FormInstructor } from './form-instructor/form-instructor';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [ListaInstructores, FormInstructor],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InstructoresRoutingModule, SharedModule],
})
export class InstructoresModule {}
