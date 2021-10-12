import { Injector } from '@angular/core';
import { locale, loadMessages, formatMessage } from 'devextreme/localization';
import { Locale, Payment, Service } from 'src/app/shared/services/app.service';
import faMessages from 'src/app/shared/services/fa.json';
import enMessages from '../../../../node_modules/devextreme/localization/messages/en.json';
import trMessages from '../../../../node_modules/devextreme/localization/messages/tr.json';

export abstract class AppComponentBase {

    public rtlEnabled!: boolean;
    public locale: string | undefined;
    formatMessage = formatMessage;

    protected service: Service;

    constructor(injector: Injector) {
        this.service = injector.get(Service);
        this.locale = this.getLocale();

        if (this.locale == "fa") {
            this.setDirection(true);
        } else {
            this.setDirection(false);
        }

        this.initMessages();
        locale(this.locale);


        // locale("fa-IR");
        // or
        // locale("fa-IR-u-ca-persian-nu-latn");
        // or
        // locale("en-US-u-ca-persian-nu-latn");

    }

    initMessages() {
        loadMessages(trMessages);
        loadMessages(enMessages);
        loadMessages(faMessages);
        loadMessages(this.service.getDictionary());
        
        console.log("this.service.getDictionary()");
        console.log(this.service.getDictionary());
    }

    getLocale() {
        var locale = sessionStorage.getItem("locale");
        return locale != null ? locale : "en";
    }

    setLocale(locale: any) {
        sessionStorage.setItem("locale", locale);
    }

    getDirection() {
        this.rtlEnabled = (sessionStorage.getItem("rtlEnabled") == "true") ? true : false;
    }

    setDirection(direction: any) {
        sessionStorage.setItem("rtlEnabled", direction);
        this.rtlEnabled = direction;
    }
}