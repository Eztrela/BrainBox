import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { INote } from 'src/app/shared/interfaces/inote';
import { MemoryBox, Note } from 'src/app/shared/models';
import { MemoryboxService } from 'src/app/shared/services/memorybox.service';
import { TagService } from 'src/app/shared/services/tag.service';
import { CreateNoteDialogComponent } from './create-note-dialog/create-note-dialog.component';
import {JsonDTOPipe} from "../../../shared/pipes/jsondto.pipe";

@Component({
  selector: 'app-note-listing',
  templateUrl: './note-listing.component.html',
  styleUrls: ['./note-listing.component.css'],
})
export class NoteListingComponent implements OnInit{
  constructor(private dialog:MatDialog, private tagService:TagService, private memoryBoxService: MemoryboxService){
  }
  @Input() memorybox: MemoryBox = new MemoryBox(0,"",0);
  @Output() newItemEvent = new EventEmitter<Note>();
  public notes: Array<Note> = new Array<Note>();
  public notePipe = new JsonDTOPipe();

  ngOnInit(): void {
      this.notes = this.memorybox.notes? this.memorybox.notes : [];
  }

  addNewItem(value: INote) {
    this.newItemEvent.emit(value);
  }

  openAddNoteDialog() {
    const dialogRef = this.dialog.open(CreateNoteDialogComponent, {
      data: {},
      panelClass: 'note-dialog-container'
    });

    dialogRef.afterClosed().subscribe((content:string) => {
      if (content) {
        if (this.memorybox.notes && this.memorybox.id) {
          let idx = this.memorybox.notes.length > 0 ? Math.max(...this.memorybox.notes.map(task => {
            return task.id ? task.id : 0;
          })) + 1 : 1;
          let note = new Note(idx, content)
          note.id = idx
          this.memorybox.notes.push(note)
          this.memoryBoxService.update(this.memorybox.id, this.memorybox).subscribe((obj: MemoryBox) => {
            this.notes = this.memorybox.notes ? this.memorybox.notes : [];
          });
        }
    }});
  }

  deleteNote(noteARemover: number){
    if (this.memorybox.notes && this.memorybox.id) {
      const idx = this.memorybox.notes.findIndex((note)=> {
        return note.id === noteARemover;
      })
      this.memorybox.notes.splice(idx, 1);
      this.memoryBoxService.update(this.memorybox.id, this.memorybox).subscribe(
          (memoryBoxAtualizado:MemoryBox) =>{
            this.memorybox = memoryBoxAtualizado;
            this.notes = this.memorybox.notes ? [...this.memorybox.notes] : [];
          })
    }
  }

  editNote(noteAEditar: INote) {
    if (this.memorybox.notes && this.memorybox.id) {
      const idx = this.memorybox.notes.findIndex((note)=>{
        return note.id === noteAEditar.id;
      })
      this.memorybox.notes[idx] = noteAEditar;
      this.memoryBoxService.update(this.memorybox.id, this.memorybox).subscribe(
          (memoryBoxAtualizado:MemoryBox) =>{
            this.memorybox = memoryBoxAtualizado;
            this.notes = this.memorybox.notes ? [...this.memorybox.notes] : [];
          })
    }
  }
}
