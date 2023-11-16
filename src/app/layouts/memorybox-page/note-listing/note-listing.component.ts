import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { INote } from 'src/app/shared/interfaces/inote';
import { MemoryBox, Note, User } from 'src/app/shared/models';
import { MemoryboxService } from 'src/app/shared/services/memorybox.service';
import { TagService } from 'src/app/shared/services/tag.service';
import { CreateNoteDialogComponent } from './create-note-dialog/create-note-dialog.component';
import { PnotePipe } from 'src/app/shared/pipes/pnote.pipe';

@Component({
  selector: 'app-note-listing',
  templateUrl: './note-listing.component.html',
  styleUrls: ['./note-listing.component.css'],
})
export class NoteListingComponent implements OnInit{
  constructor(private dialog:MatDialog,private tagService:TagService, private memoryBoxService: MemoryboxService){
  }
  @Input() memorybox: MemoryBox = new MemoryBox(0,"",0);
  @Output() newItemEvent = new EventEmitter<INote>();
  public notes: Array<INote> = new Array<INote>();
  public notePipe = new PnotePipe();

  ngOnInit(): void {
      this.notes = this.memorybox.notes
  }

  addNewItem(value: INote) {
    this.newItemEvent.emit(value);
  }

  openAddNoteDialog() {
    const dialogRef = this.dialog.open(CreateNoteDialogComponent, {
      data: {},
      panelClass: 'dialog-container'
    });

    dialogRef.afterClosed().subscribe((content:string) => {
      if (content) {
          let note = new Note(0, content)
          this.memorybox.notes.push(note as INote)
          this.memoryBoxService.update(this.memorybox.id, this.memorybox).subscribe((obj: MemoryBox) => {
            console.log(obj.notes)
            this.notes = this.memorybox.notes;
          });
        

      
    }});
  }
  openEditNoteDialog(note: INote) {
    const dialogRef = this.dialog.open(CreateNoteDialogComponent, {
      data: {content: note.content},
      panelClass: 'dialog-container'
    });

    dialogRef.afterClosed().subscribe((content:string) => {
      if (content) {
          let note = new Note(0, content)
          const idx = this.memorybox.notes.findIndex((note)=>{
            console.log(note.id === note.id)
            return note.id === note.id
          })
          this.memorybox.notes[idx] = (note as INote)
          this.memoryBoxService.update(this.memorybox.id, this.memorybox).subscribe((obj: MemoryBox) => {
            console.log(obj.notes)
            this.notes = this.memorybox.notes;
          });
        

      
    }});
  }

  deleteNote(noteARemover: INote){
    console.log(this.memorybox)
    const idx = this.memorybox.notes.findIndex((note)=>{
      console.log(note.id === noteARemover.id)
      return note.id === noteARemover.id
    })
    console.log(idx)
    this.memorybox.notes.splice(idx, 1)[0];
    console.log(this.memorybox)
    
    this.memoryBoxService.update(this.memorybox.id, this.memorybox).subscribe(memoryBoxAtualizado =>{
      this.memorybox = memoryBoxAtualizado;
      this.notes = [...this.memorybox.notes]
    })
    
  }
}
