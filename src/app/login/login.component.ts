import { Component } from '@angular/core';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(
    private authService: AuthService
  ) { }

  async login(): Promise<void> {
    await this.authService.loginWithGoogle();
  }
}
