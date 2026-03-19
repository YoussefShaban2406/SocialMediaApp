import { CanActivateFn, Router } from '@angular/router';
import { Stored_Keys } from '../constants/stored-keys';
import { inject } from '@angular/core';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userTocken = localStorage.getItem(Stored_Keys.userTocken);
  if (userTocken) {
    return router.createUrlTree(['/feed']);
  }else{
    return true;
  }
}
