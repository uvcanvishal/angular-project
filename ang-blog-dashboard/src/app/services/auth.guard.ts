import { CanActivateFn } from '@angular/router';
import {AuthService} from './auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);
  if(authService.isLoggedInGuard){
    console.log('Access Granted');
    return true;
  }
  else{
    toastr.warning('You dont have permission to access this page ...');
    router.navigate(['/Login']);
    return false;
  }
};
