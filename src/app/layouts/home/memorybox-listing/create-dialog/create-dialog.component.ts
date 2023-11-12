import { Component } from '@angular/core';
import {MemoryBox} from "../../../../shared/models";
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent {
  memorybox: MemoryBox = new MemoryBox( 0,"", 0);
  public titleForm = new FormControl();

  ngOnInit() {
    this.titleForm = new FormControl(this.memorybox.title, [
      Validators.required,
      Validators.minLength(4)
    ]);
  }

  constructor(public dialogRef: MatDialogRef<CreateDialogComponent>) {
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
