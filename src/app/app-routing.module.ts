import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from "@angular/material/card";
import { NgForOf } from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatCardModule, NgForOf, MatButtonModule],
    declarations: [
      
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
