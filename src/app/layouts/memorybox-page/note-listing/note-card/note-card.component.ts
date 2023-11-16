import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { INote } from 'src/app/shared/interfaces/inote';
import { Note } from 'src/app/shared/models';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent {

  public isEditing: boolean = false;
  @Input() note: INote = new class implements INote { 
    id = 0
    content = ""
  }
  @Output() deleteEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  public contentForm = new FormControl();


  ngOnInit() {
    this.contentForm = new FormControl(this.note.content, [
      Validators.required,
      Validators.minLength(4)
    ]);
  }

  toggleEditNote() {
    this.isEditing = !this.isEditing;
  }

  deleteNote() {
    this.deleteEvent.emit(this.note.id);
  }

  editNote() {
    this.editEvent.emit(this.note)
  }

}
