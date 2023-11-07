import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryboxPageComponent } from './memorybox-page.component';
import { TaskListingComponent } from './task-listing/task-listing.component';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    MemoryboxPageComponent,
    TaskListingComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    ComponentsModule,

  ]
})
export class MemoryboxPageModule { }
