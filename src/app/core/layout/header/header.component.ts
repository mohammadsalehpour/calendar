import {Component} from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrl: 'header.component.scss',
  standalone: true,
  imports: [SharedModule],
})

export class HeaderComponent {}
