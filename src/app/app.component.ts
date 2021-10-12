import { Component, HostBinding, Injector } from '@angular/core';
import { AppComponentBase } from './shared/entities/app-component-base';
import { AuthService, ScreenService, AppInfoService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends AppComponentBase {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(injector: Injector, private authService: AuthService, private screen: ScreenService, public appInfo: AppInfoService) {
    super(injector);
  }

  isAuthenticated() {
    return this.authService.loggedIn;
  }
}
