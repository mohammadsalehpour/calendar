import { Injector } from '@angular/core';
import { NgModule, Component, enableProdMode, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxSelectBoxModule, DxDataGridModule } from 'devextreme-angular';

import { locale, loadMessages, formatMessage } from 'devextreme/localization';
import { AppComponentBase } from 'src/app/shared/entities/app-component-base';
import { Locale, Payment, Service } from 'src/app/shared/services/app.service';
import faMessages from 'src/app/shared/services/fa.json';
import deMessages from '../../../../node_modules/devextreme/localization/messages/de.json';
import trMessages from '../../../../node_modules/devextreme/localization/messages/tr.json';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [Service],
  preserveWhitespaces: true
})

export class HomeComponent extends AppComponentBase implements OnInit {
  public auto: string = 'true';
  public locales!: Locale[];
  public payments!: Payment[];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.payments = this.service.getPayments();
    this.locales = this.service.getLocales();
  }


  changeLocale(data: any) {
    this.setLocale(data.value);
    parent.document.location.reload();
  }

}