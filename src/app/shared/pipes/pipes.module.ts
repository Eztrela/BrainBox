import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PnotePipe} from "./pnote.pipe";
import { PtaskPipe } from './ptask.pipe';
import { PtagPipe } from './ptag.pipe';



@NgModule({
  declarations: [
    PnotePipe,
    PtaskPipe,
    PtagPipe
  ],
  imports: [
    CommonModule
  ], exports: [
    PnotePipe
  ]
})
export class PipesModule { }
