import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonDTOPipe } from './jsondto.pipe';



@NgModule({
  declarations: [
    JsonDTOPipe,
  ],
  imports: [
    CommonModule
  ], exports: [
  ]
})
export class PipesModule { }
