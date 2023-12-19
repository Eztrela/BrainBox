import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css']
})
export class UserSigninComponent implements OnInit {
  userLogin!: FormGroup;
  emailForm = new FormControl();
  passForm = new FormControl();

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    const StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{6,12}$/;
    this.emailForm = new FormControl("", [
      Validators.email,
      Validators.required
    ])
    this.passForm = new FormControl("", [
      //Validators.pattern(StrongPasswordRegx),
      Validators.required
    ])
    this.userLogin = new FormGroup({
      email: this.emailForm,
      password: this.passForm
    })
  }

  onSubmitLogin() {
    this.userService.getByEmail(this.emailForm.value).subscribe(ref => {
      if (ref) {
        this.userService.validatePassword(ref.username, this.passForm.value).subscribe(res => {
          if (res) {
            console.log("LOGIN");
            localStorage.setItem("userid", ref.id.toString());
            this.router.navigate(['/home']);
          } else {
            console.log("WRONG");
          }
        })
      }
    })
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
