import {inject} from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from "./snackbar.service";

export const AuthGuard = () => {

  const router: Router = inject(Router)
  const snackBarService: SnackbarService = inject(SnackbarService)

  if (localStorage.getItem('currentUser')) return true;
  return router.navigateByUrl('login')
}
