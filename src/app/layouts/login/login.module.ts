import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserSigninComponent } from './user-signin/user-signin.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    UserSignupComponent,
    UserSigninComponent
  ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        ReactiveFormsModule,
        MatInputModule,
        RouterLink,
        MatButtonModule,
        MatIconModule,
    ]
})
export class LoginModule { }
