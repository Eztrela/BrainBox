import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemtasksComponent} from "./listagemtasks/listagemtasks.component";
import { ListagemnotesComponent } from "./listagemnotes/listagemnotes.component";
import { MatCardModule } from "@angular/material/card";
import { NgForOf } from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
  { path: 'tasks', component: ListagemtasksComponent},
  { path: 'notes', component: ListagemnotesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatCardModule, NgForOf, MatButtonModule],
    declarations: [
        ListagemtasksComponent,
        ListagemnotesComponent
    ],
    exports: [RouterModule, ListagemtasksComponent, ListagemnotesComponent]
})
export class AppRoutingModule { }
