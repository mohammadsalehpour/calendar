import { Directive, Injector, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Directive()
export abstract class CoreComponent implements OnDestroy {

    private subscriptions: Subscription[] = [];
    protected router: Router;

    constructor(protected injector: Injector) {
        this.router = injector.get(Router);
    }

    set setSubs(sub: Subscription) {
        this.subscriptions.push(sub);
    }

    public goTo(path: string): void {
        this.router.navigate([path]);
    }

    private unSubscribeSubs(): void {
        this.subscriptions.forEach(subscription => {
            if (!!subscription && !subscription.closed)
                subscription.unsubscribe();
        });
    }

    ngOnDestroy(): void {
        this.unSubscribeSubs();
    }

}
