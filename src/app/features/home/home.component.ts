import { Component, Injector } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CoreComponent } from '../../core/components/core.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [SharedModule],
})
export class HomeComponent extends CoreComponent {

  constructor(protected override injector: Injector) {
    super(injector);
  }

}
