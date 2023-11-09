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
import { MatIcon, MatIconModule } from '@angular/material/icon';


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
    MatIconModule
  ]
})
export class MemoryboxPageModule { }
