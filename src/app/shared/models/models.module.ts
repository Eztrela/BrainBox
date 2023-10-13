import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../models';
import { Task } from '../models';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    User,
    Task
  ]
})
export class ModelsModule { }
