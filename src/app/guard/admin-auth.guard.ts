import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.getAppUser$()
      .pipe(
        map(appUser => appUser.isAdmin)
      );
  }
}
