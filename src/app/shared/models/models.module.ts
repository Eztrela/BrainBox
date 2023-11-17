import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from "../models";
import { Note } from '../models';
import { Task } from '../models';
import { Tag } from '../models';
import { MemoryBox } from '../models';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  exports: [
    User,
    Note,
    Task,
    Tag,
    MemoryBox
  ]
})
export class ModelsModule { }
