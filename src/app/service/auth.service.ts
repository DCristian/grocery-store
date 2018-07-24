import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, of } from 'rxjs';
import { auth, User } from 'firebase/app';
import { switchMap } from 'rxjs/operators';

import { UserService } from './user.service';
import { AppUser } from '../model/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.user$ = this.afAuth.authState;
  }

  async loginWithGoogle(): Promise<void> {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    let result = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());

    if (result.user) {
      this.userService.save(result.user);
      await this.router.navigateByUrl(returnUrl);
    }
  }

  async logout(): Promise<void> {
    await this.afAuth.auth.signOut();
    await this.router.navigate(['/']);
  }

  getUser$(): Observable<User> {
    return this.user$;
  }

  getAppUser$(): Observable<AppUser> {
    return this.user$
      .pipe(
        switchMap(user => {
          if (user) {
            return this.userService.get(user.uid).valueChanges();
          }

          return of(null);
        }),
      );
  }
}
