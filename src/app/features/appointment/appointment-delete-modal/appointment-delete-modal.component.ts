import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from '../calendar.interface';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-appointment-delete-modal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './appointment-delete-modal.component.html',
  styleUrl: './appointment-delete-modal.component.scss'
})
export class AppointmentDeleteModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Appointment) { }

}
