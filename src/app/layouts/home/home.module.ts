import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { HomeComponent } from './home.component';
import {MemoryboxListingComponent} from "./memorybox-listing/memorybox-listing.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {ComponentsModule} from "../components/components.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MemoryboxCardComponent } from './memorybox-listing/memorybox-card/memorybox-card.component';
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    HomeComponent,
    MemoryboxListingComponent,
    MemoryboxCardComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    RouterLink,
    ComponentsModule,
    FlexLayoutModule,
    MatButtonModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
