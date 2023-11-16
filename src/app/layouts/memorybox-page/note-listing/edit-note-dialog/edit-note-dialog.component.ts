import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateNoteDialogComponent } from '../create-note-dialog/create-note-dialog.component';
import { INote } from 'src/app/shared/interfaces/inote';

@Component({
  selector: 'app-edit-note-dialog',
  templateUrl: './edit-note-dialog.component.html',
  styleUrls: ['./edit-note-dialog.component.css']
})
export class EditNoteDialogComponent {
  public note: INote = new class implements INote(
    {
      id:number;
    }
  )
  public id: number;
  public content: string;
  public contentForm = new FormControl();


  ngOnInit() {
    this.contentForm = new FormControl(this.content, [
      Validators.required,
      Validators.minLength(4)
    ]);
  }

  constructor(public dialogRef: MatDialogRef<CreateNoteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id
    this.content = data.content;
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
