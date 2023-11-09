import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryboxPageComponent } from './memorybox-page.component';
import { TaskListingComponent } from './task-listing/task-listing.component';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ComponentsModule } from '../components/components.module';
import { NoteListingComponent } from './note-listing/note-listing.component';
import { MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    MemoryboxPageComponent,
    TaskListingComponent,
    NoteListingComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    ComponentsModule,
    MatTableModule,
  ]
})
export class MemoryboxPageModule { }
