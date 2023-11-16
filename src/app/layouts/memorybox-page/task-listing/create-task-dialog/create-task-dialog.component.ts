import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MemoryBox } from 'src/app/shared/models';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent {
  memorybox: MemoryBox = new MemoryBox( 0,"", 0);
  public titleForm = new FormControl();

  ngOnInit() {
    this.titleForm = new FormControl(this.memorybox.title, [
      Validators.required,
      Validators.minLength(4)
    ]);
  }

  constructor(public dialogRef: MatDialogRef<CreateTaskDialogComponent>) {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  getErrorMessage() {
    if (this.titleForm.hasError('required')) {
      return 'Você precisa fornecer um título!';
    } else if (this.titleForm.hasError('minlength')) {
      return 'O título precisa ter no mínimo 4 carácteres!';
    } else { return ''}
  }
}
