import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route, stare: RouterStateSnapshot): Observable<boolean> {
    return this.authService.getUser$().pipe(map(user => {
      if (user) {
        return true;
      }

      this.router.navigate(['/login'], { queryParams: { returnUrl: stare.url }});

      return false;
    }));
  }
}
