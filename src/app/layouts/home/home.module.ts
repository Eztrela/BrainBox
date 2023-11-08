import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
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
import {CdkDrag, CdkDragPlaceholder, CdkDropList, CdkDropListGroup} from "@angular/cdk/drag-drop";
import {MatGridListModule} from "@angular/material/grid-list";



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
    CdkDrag,
    CdkDropList,
    CdkDragPlaceholder,
    NgOptimizedImage,
    MatGridListModule,
    CdkDropListGroup,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
