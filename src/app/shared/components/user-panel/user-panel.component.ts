import { Component, NgModule, Input, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxListModule } from 'devextreme-angular/ui/list';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { IUser } from '../../services/auth.service';
import { AppComponentBase } from '../../entities/app-component-base';

@Component({
  selector: 'app-user-panel',
  templateUrl: 'user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})

export class UserPanelComponent extends AppComponentBase {
  @Input()
  menuItems: any;

  @Input()
  menuMode!: string;

  @Input()
  user!: IUser | null;

  constructor(injector: Injector) {
    super(injector);
  }
}

@NgModule({
  imports: [
    DxListModule,
    DxContextMenuModule,
    CommonModule
  ],
  declarations: [ UserPanelComponent ],
  exports: [ UserPanelComponent ]
})
export class UserPanelModule { }
