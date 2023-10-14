import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from "../models";
import { Note } from '../models';
import { Tag } from '../models';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  exports: [
    User,
    Note,
    Tag
  ]
})
export class ModelsModule { }
