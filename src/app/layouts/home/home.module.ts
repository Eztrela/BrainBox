import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {MemoryboxListingComponent} from "./memorybox-listing/memorybox-listing.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {ComponentsModule} from "../components/components.module";



@NgModule({
  declarations: [
    HomeComponent,
    MemoryboxListingComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    RouterLink,
    ComponentsModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
