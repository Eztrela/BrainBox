import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MemoryBox, Note } from 'src/app/shared/models';
import { CreateNoteDialogComponent } from './create-note-dialog/create-note-dialog.component';
import { MemoryboxService } from 'src/app/shared/services/memorybox.service';
import {NoteService} from "../../../shared/services/note.service";

@Component({
  selector: 'app-note-listing',
  templateUrl: './note-listing.component.html',
  styleUrls: ['./note-listing.component.css'],
})
export class NoteListingComponent implements OnInit{
  constructor(private dialog:MatDialog, private memoryBoxService: MemoryboxService, private noteService: NoteService){}
  @Input() id!: number;
  @Input() memorybox!: MemoryBox;
  @Output() newItemEvent = new EventEmitter<Note>();
  public notes: Array<Note> = new Array<Note>();

  ngOnInit(): void {
      this.notes = this.memorybox.notes;
  }

  openAddNoteDialog() {
    const dialogRef = this.dialog.open(CreateNoteDialogComponent, {
      data: {},
      panelClass: 'note-dialog-container'
    });

    dialogRef.afterClosed().subscribe((content:string) => {
      if (content) {
        if (this.memorybox) {
          let note = {content:content}
          this.noteService.create(note).subscribe(createRes => {
            this.memorybox.notes.push(createRes)
            this.memoryBoxService.update(this.id, this.memorybox).subscribe(updateRes => {
              this.memorybox = updateRes;
              this.notes = this.memorybox.notes;
            });
          })

        }
    }});
  }

  deleteNote(noteARemover: number){
    if (this.memorybox) {
      const idx = this.memorybox.notes.findIndex((note)=> {
        return note.id === noteARemover;
      })
      this.memorybox.notes.splice(idx, 1);
      this.memoryBoxService.update(this.id, this.memorybox).subscribe(
        res => {
          this.noteService.delete(noteARemover).subscribe(deleteRes => {
            this.notes = this.memorybox.notes ? [...this.memorybox.notes] : [];
          })
        })
    }
  }

  editNote(noteAEditar: Note) {
    if (this.memorybox) {
      const idx = this.memorybox.notes.findIndex((note)=>{
        return note.id === noteAEditar.id;
      })
      this.memorybox.notes[idx] = noteAEditar;
      this.memoryBoxService.update(this.id, this.memorybox).subscribe(
          res => {
            this.noteService.update(noteAEditar.id, noteAEditar).subscribe(editRes => {
              this.notes = this.memorybox.notes ? [...this.memorybox.notes] : [];
            })
          })
    }
  }
}
