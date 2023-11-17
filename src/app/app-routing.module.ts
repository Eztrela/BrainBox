import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from "@angular/material/card";
import { NgForOf } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { HomeComponent } from "./layouts/home/home.component";
import { MemoryboxPageComponent } from "./layouts/memorybox-page/memorybox-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: "Memorybox"
  },
  {
    path: 'memorybox/:id',
    component: MemoryboxPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatCardModule, NgForOf, MatButtonModule],
    declarations: [

    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
