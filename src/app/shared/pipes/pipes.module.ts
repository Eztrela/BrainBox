import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PnotePipe} from "./pnote.pipe";
import { PtaskPipe } from './ptask.pipe';
import { PtagPipe } from './ptag.pipe';
import { PuserPipe } from './puser.pipe';
import { PmemoryboxPipe } from './pmemorybox.pipe'; 



@NgModule({
  declarations: [
    PnotePipe,
    PtaskPipe,
    PtagPipe,
    PuserPipe,
    PmemoryboxPipe,
  ],
  imports: [
    CommonModule
  ], exports: [
    PnotePipe,
    PtaskPipe,
    PtagPipe,
    PuserPipe,
    PmemoryboxPipe
  ]
})
export class PipesModule { }
