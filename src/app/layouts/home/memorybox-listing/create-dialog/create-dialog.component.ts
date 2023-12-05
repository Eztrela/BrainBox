import { Component } from '@angular/core';
import {MemoryBox} from "../../../../shared/models";
import {MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent {
  public titleForm = new FormControl();
  public bannerForm = new FormControl();
  public memoryBoxForm!: FormGroup;

  public urlValidator: ValidatorFn = (control: AbstractControl) => {
    let validUrl = true;

    try {
      new URL(control.value)
    } catch {
      validUrl = false;
    }

    return validUrl ? null : { invalidUrl: true };
  }

  ngOnInit() {
    this.titleForm = new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]);
    this.bannerForm = new FormControl("https://img.freepik.com/free-vector/gradient-abstract-purple-color-background-design_343694-2875.jpg", [
      this.urlValidator
    ]);
    this.memoryBoxForm = new FormGroup({
      title: this.titleForm,
      banner: this.bannerForm
    });
  }

  constructor(public dialogRef: MatDialogRef<CreateDialogComponent>) {
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

  getBannerErrorMessage() {
    if (this.bannerForm.hasError('invalidUrl')) {
      return 'URL Inválida!';
    } else { return ''}
  }
}
