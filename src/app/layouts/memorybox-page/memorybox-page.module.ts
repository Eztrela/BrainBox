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
import { MatIconModule } from '@angular/material/icon';
import { CreateTaskDialogComponent } from './task-listing/create-task-dialog/create-task-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateNoteDialogComponent } from './note-listing/create-note-dialog/create-note-dialog.component';
import { NoteCardComponent } from './note-listing/note-card/note-card.component';
import { MatButtonModule } from '@angular/material/button';
import {CdkDrag} from "@angular/cdk/drag-drop";
import {MatSelectModule} from '@angular/material/select';
import { EditTaskDialogComponent } from './task-listing/edit-task-dialog/edit-task-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    MemoryboxPageComponent,
    TaskListingComponent,
    NoteListingComponent,
    CreateTaskDialogComponent,
    CreateNoteDialogComponent,
    NoteCardComponent,
    EditTaskDialogComponent
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
    MatFormFieldModule,
    MatButtonModule,
    CdkDrag,
    ReactiveFormsModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule
  ]
})
export class MemoryboxPageModule { }
