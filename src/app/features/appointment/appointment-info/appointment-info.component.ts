import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Appointment } from '../calendar.interface';
import { DatePipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-appointment-info',
  standalone: true,
  templateUrl: './appointment-info.component.html',
  styleUrls: ['./appointment-info.component.scss'],
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatIconModule, MatDialogClose, JsonPipe, DatePipe],
})
export class AppointmentInfoComponent {
  constructor(public dialogRef: MatDialogRef<AppointmentInfoComponent>, @Inject(MAT_DIALOG_DATA) public data: Appointment) {}
}
