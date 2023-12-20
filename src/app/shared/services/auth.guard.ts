import {inject} from '@angular/core';
import { Router } from '@angular/router';

export const AuthGuard = () => {

  const router: Router = inject(Router)

  if (localStorage.getItem('currentUser')) return true;
  return router.navigateByUrl('/login')
}
