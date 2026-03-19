import { CanActivateFn, Router } from '@angular/router';
import { Stored_Keys } from '../constants/stored-keys';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userTocken =  localStorage.getItem(Stored_Keys.userTocken);
  if(userTocken) {
    return true;
  }else{
    return router.createUrlTree(['login']);
  }
};