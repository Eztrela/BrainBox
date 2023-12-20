import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  hide = true;
  private username: string;
  private email: string;
  userEdit!: FormGroup;
  userForm = new FormControl;
  emailForm = new FormControl();
  passForm = new FormControl();

  constructor(public dialogRef: MatDialogRef<EditUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.username = data.username;
    this.email = data.email;
  }

  ngOnInit() {
    const StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{6,12}$/;
    this.userForm = new FormControl(this.username, [
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.required
    ])
    this.emailForm = new FormControl(this.email, [
      Validators.email,
      Validators.required
    ])
    this.passForm = new FormControl("", [
      Validators.pattern(StrongPasswordRegx),
      Validators.required
    ])
    this.userEdit = new FormGroup({
      username: this.userForm,
      email: this.emailForm,
      password: this.passForm
    })
  }

  onNoClick() {
    this.dialogRef.close();
  }

  getUserErrorMessage() {
    if (this.userForm.hasError('required')) {
      return 'Usuário é obrigatório!'
    } else if (this.userForm.hasError('minlength')) {
      return 'Mínimo de 3 carácteres!';
    } else if (this.userForm.hasError('maxlength')) {
      return 'Máximo de 15 carácteres!';
    } else {return ''}
  }

  getEmailErrorMessage() {
    if (this.emailForm.hasError('required')) {
      return 'E-mail é obrigatório!';
    } else if (this.emailForm.hasError('email')) {
      return 'E-mail inválido!';
    } else { return ''}
  }

  getPasswordErrorMessage() {
    if (this.passForm.hasError('required')) {
      return 'Senha é obrigatória!';
    } else if (this.passForm.hasError('pattern')) {
      return 'Senha fraca!';
    } else { return ''}
  }
}
