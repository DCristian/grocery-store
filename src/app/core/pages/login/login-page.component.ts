import { Component } from '@angular/core';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  constructor(
    private authService: AuthService
  ) { }

  async login(): Promise<void> {
    await this.authService.loginWithGoogle();
  }
}
