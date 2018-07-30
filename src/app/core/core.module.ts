// Modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundPageComponent } from './pages/not-found/not-found-page.component';
import { LoginPageComponent } from './pages/login/login-page.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: '**',
        component: NotFoundPageComponent
      },
    ])
  ],
  declarations: [
    NavbarComponent,
    NotFoundPageComponent,
    LoginPageComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
