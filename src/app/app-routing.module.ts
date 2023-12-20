import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from "@angular/material/card";
import { NgForOf } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { AuthGuard } from "./shared/services/auth.guard";
import { HomeComponent } from "./layouts/home/home.component";
import { MemoryboxPageComponent } from "./layouts/memorybox-page/memorybox-page.component";
import {UserSigninComponent} from "./layouts/login/user-signin/user-signin.component";
import {UserSignupComponent} from "./layouts/login/user-signup/user-signup.component";
import {LoginGuard} from "./shared/services/login.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: UserSigninComponent,
    title: 'Login',
    canActivate: [LoginGuard]
  },
  {
    path: 'signup',
    component: UserSignupComponent,
    title: 'Cadastre-se',
    canActivate: [LoginGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'memorybox/:id',
    component: MemoryboxPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatCardModule, NgForOf, MatButtonModule],
    declarations: [

    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
