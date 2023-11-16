import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { INote } from 'src/app/shared/interfaces/inote';
import { MemoryBox, Note } from 'src/app/shared/models';

@Component({
  selector: 'app-create-note-dialog',
  templateUrl: './create-note-dialog.component.html',
  styleUrls: ['./create-note-dialog.component.css']
})
export class CreateNoteDialogComponent {
  note: Note = new Note( 0,"");
  public contentForm = new FormControl();


  ngOnInit() {
    this.contentForm = new FormControl(this.note.content, [
      Validators.required,
      Validators.minLength(4)
    ]);
  }

  constructor(public dialogRef: MatDialogRef<CreateNoteDialogComponent>) {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  getErrorMessage() {
    if (this.contentForm.hasError('required')) {
      return 'Você precisa fornecer um título!';
    } else if (this.contentForm.hasError('minlength')) {
      return 'O título precisa ter no mínimo 4 carácteres!';
    } else { return ''}
  }
}
