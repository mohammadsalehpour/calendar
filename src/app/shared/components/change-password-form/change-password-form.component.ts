import { CommonModule } from '@angular/common';
import { Component, Injector, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ValidationCallbackData } from 'devextreme/ui/validation_rules';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services';
import { AppComponentBase } from '../../entities/app-component-base';


@Component({
  selector: 'app-change-passsword-form',
  templateUrl: './change-password-form.component.html'
})
export class ChangePasswordFormComponent extends AppComponentBase implements OnInit {
  loading = false;
  formData: any = {};
  recoveryCode: string = '';

  constructor(injector: Injector, private authService: AuthService, private router: Router, private route: ActivatedRoute) {super(injector); }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.recoveryCode = params.get('recoveryCode') || '';
    });
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { password } = this.formData;
    this.loading = true;

    const result = await this.authService.changePassword(password, this.recoveryCode);
    this.loading = false;

    if (result.isOk) {
      this.router.navigate(['/login-form']);
    } else {
      notify(result.message, 'error', 2000);
    }
  }

  confirmPassword = (e: ValidationCallbackData) => {
    return e.value === this.formData.password;
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule
  ],
  declarations: [ ChangePasswordFormComponent ],
  exports: [ ChangePasswordFormComponent ]
})
export class ChangePasswordFormModule { }
