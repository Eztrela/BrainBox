import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../shared/models";

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit{
  userSignup!: FormGroup;
  userForm = new FormControl;
  emailForm = new FormControl();
  passForm = new FormControl();

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    const StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{6,12}$/;
    this.userForm = new FormControl("", [
      Validators.min(3),
      Validators.required
    ])
    this.emailForm = new FormControl("", [
      Validators.email,
      Validators.required
    ])
    this.passForm = new FormControl("", [
      //Validators.pattern(StrongPasswordRegx),
      Validators.required
    ])
    this.userSignup = new FormGroup({
      username: this.userForm,
      email: this.emailForm,
      password: this.passForm
    })
  }

  getUserErrorMessage() {
    if (this.userForm.hasError('required')) {
      return 'Usuário é obrigatório!'
    } else if (this.userForm.hasError('min')) {
      return 'Usuário tem que ter no mínimo 3 carácteres!';
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

  onSubmitUser() {
    this.userService.validate(this.userForm.value, this.emailForm.value).subscribe(res => {
      if (res) {
        this.userService.create(
          this.userForm.value,
          this.emailForm.value,
          this.passForm.value)
          .subscribe(newUser => {
            this.router.navigateByUrl('login')
        })
      } else {
         console.log("BAD USERNAME/EMAIL");
      }
    })
  }
}
