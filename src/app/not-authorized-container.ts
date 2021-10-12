import { CommonModule } from '@angular/common';
import { Component, Injector, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SingleCardModule } from 'src/app/layouts';
import { Router } from '@angular/router';
import { AppComponentBase } from './shared/entities/app-component-base';

@Component({
  selector: 'app-not-authorized-container',
  template: `
    <app-single-card [title]="formatMessage(title)" [description]="formatMessage(description)">
      <router-outlet></router-outlet>
    </app-single-card>
  `,
  styles: [`
    :host {
      width: 100%;
      height: 100%;
    }
  `]
})
export class NotAuthorizedContainerComponent extends AppComponentBase {

  constructor(injector: Injector, private router: Router) {
    super(injector)
   }

  get title() {
    const path = this.router.url.split('/')[1];
    switch (path) {
      case 'login-form': return 'SignIn';
      case 'reset-password': return 'ResetPassword';
      case 'create-account': return 'SignUp';
      case 'change-password': return 'ChangePassword';
      default: return '';
    }
  }

  get description() {
    const path = this.router.url.split('/')[1];
    switch (path) {
      case 'reset-password': return 'Please enter the email address that you used to register, and we will send you a link to reset your password via Email.';
      default: return '';
    }
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SingleCardModule,
  ],
  declarations: [NotAuthorizedContainerComponent],
  exports: [NotAuthorizedContainerComponent]
})
export class NotAuthorizedContainerModule { }
