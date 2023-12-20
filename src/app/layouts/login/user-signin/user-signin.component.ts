import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../../../shared/services/snackbar.service";

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css']
})
export class UserSigninComponent implements OnInit {
  hide = true;
  userLogin!: FormGroup;
  emailForm = new FormControl();
  passForm = new FormControl();

  constructor(private userService: UserService, private router: Router, private snackBarService: SnackbarService) {
  }

  ngOnInit() {
    this.emailForm = new FormControl("", [
      Validators.email,
      Validators.required
    ])
    this.passForm = new FormControl("", [
      Validators.minLength(6),
      Validators.maxLength(12),
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
            localStorage.setItem("userid", ref.id.toString());
            this.router.navigate(['/home']).then(res => {
              this.snackBarService.sucesso("Login realizado com sucesso!");
            })
          } else {
            this.userLogin.controls['password'].setErrors({'incorrect': true})
            this.snackBarService.erro("Senha incorreta!")
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
    } else if (this.passForm.hasError('minlength')) {
      return 'Mínimo de 6 carácteres!';
    } else if (this.passForm.hasError('maxlength')) {
      return 'Máximo de 12 carácteres!';
    } else if (this.passForm.hasError('incorrect')) {
      return ''
    } else { return ''}
  }
}
