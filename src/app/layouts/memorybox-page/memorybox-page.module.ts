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
import { CreateTaskDialogComponent } from './task-listing/create-task-dialog/create-task-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateNoteDialogComponent } from './note-listing/create-note-dialog/create-note-dialog.component';
import { EditNoteDialogComponent } from './note-listing/edit-note-dialog/edit-note-dialog.component';


@NgModule({
  declarations: [
    MemoryboxPageComponent,
    TaskListingComponent,
    NoteListingComponent,
    CreateTaskDialogComponent,
    CreateNoteDialogComponent,
    EditNoteDialogComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    ComponentsModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class MemoryboxPageModule { }
