import { Component } from '@angular/core';
import {Tag} from "../../../../shared/models";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-tag-dialog',
  templateUrl: './create-tag-dialog.component.html',
  styleUrls: ['./create-tag-dialog.component.css']
})
export class CreateTagDialogComponent {
  tag: Tag = new Tag(0,{});

  public titleForm = new FormControl();
  public colorForm = new FormControl();
  public tagForm!: FormGroup;

  ngOnInit() {
    const reg = '^#(?:[0-9a-fA-F]{3}){1,2}$';
    this.titleForm = new FormControl(this.tag.title, [
      Validators.required,
      Validators.minLength(4)
    ]);
    this.colorForm = new FormControl("#8073d1", [
      Validators.required,
      Validators.pattern(reg)
    ]);
    this.tagForm = new FormGroup({
      title: this.titleForm,
      color: this.colorForm
    });
  }

  constructor(public dialogRef: MatDialogRef<CreateTagDialogComponent>) {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  getTitleErrorMessage() {
    if (this.titleForm.hasError('required')) {
      return 'Você precisa fornecer um título!';
    } else if (this.titleForm.hasError('minlength')) {
      return 'O título precisa ter no mínimo 4 carácteres!';
    } else { return ''}
  }

  getColorErrorMessage() {
    if (this.colorForm.hasError('required')) {
      return 'Você precisa fornecer uma cor!';
    } else if (this.colorForm.hasError('pattern')) {
      return 'Cor precisa ser hexadecimal!';
    } else { return ''}
  }
}
