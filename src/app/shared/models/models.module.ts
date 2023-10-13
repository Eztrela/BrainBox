import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../models/user.model';
import { Tag } from '../models/tag.model';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    User,
    Tag
  ]
})
export class ModelsModule { }
