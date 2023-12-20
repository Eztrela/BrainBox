import {inject} from '@angular/core';
import { Router } from '@angular/router';

export const LoginGuard = () => {

  const router: Router = inject(Router)

  if (localStorage.getItem('currentUser')) return router.navigateByUrl('/home');
  else return
}
