import { Component, NgModule, Input, Injector} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxScrollViewModule }  from 'devextreme-angular/ui/scroll-view';
import { AppComponentBase } from 'src/app/shared/entities/app-component-base';

@Component({
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss']
})
export class SingleCardComponent extends AppComponentBase {
  @Input()
  title!: string;

  @Input()
  description!: string;

  constructor(injector: Injector) { 
    super(injector);
  }
}

@NgModule({
  imports: [ CommonModule, DxScrollViewModule ],
  exports: [ SingleCardComponent ],
  declarations: [ SingleCardComponent ]
})
export class SingleCardModule {
  
}
