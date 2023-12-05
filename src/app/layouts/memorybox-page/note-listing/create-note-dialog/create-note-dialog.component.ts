import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-note-dialog',
  templateUrl: './create-note-dialog.component.html',
  styleUrls: ['./create-note-dialog.component.css']
})
export class CreateNoteDialogComponent {
  public content: string;
  public contentForm = new FormControl();


  ngOnInit() {
    this.contentForm = new FormControl(this.content, [
      Validators.required,
      Validators.minLength(4)
    ]);
  }

  constructor(public dialogRef: MatDialogRef<CreateNoteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.content = data.content;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  getErrorMessage() {
    if (this.contentForm.hasError('required')) {
      return 'Você precisa fornecer algum conteúdo!';
    } else if (this.contentForm.hasError('minlength')) {
      return 'Anotação precisa ter no mínimo 4 carácteres!';
    } else { return ''}
  }
}
