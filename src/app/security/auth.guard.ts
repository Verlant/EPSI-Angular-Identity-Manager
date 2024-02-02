import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from "./authentication.service";

export const authGuard = () => {
  // const auth = inject(AuthenticationService);
  const router = inject(Router);

  if(!AuthenticationService.isLoggedIn()) {
    router.navigate(['/login']).then((e) => {
      if(!e) {
        console.error('Navigation has failed !');
      }
    });
    return false
  }
  return true
};
