import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MetasService } from '../services/metas.service';

export const authGuard: CanActivateFn = (route, state) => {

  const metaservice = inject(MetasService);
  const router = inject(Router);

  if(metaservice.isLogged()){
    return true;
  }
  router.navigate(['/login']);
  return false;
  
};
