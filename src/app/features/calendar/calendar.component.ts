import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CalendarService } from '../appointment/calendar.service';
import { SharedModule } from '../../shared/shared.module';
import { CoreComponent } from '../../core/components/core.component';
import { CalendarDayViewComponent } from '../appointment/calendar-day-view/calendar-day-view.component';
import { Appointment } from '../appointment/calendar.interface';

@Component({
  standalone: true,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [provideNativeDateAdapter(), CalendarService],
  imports: [SharedModule],
})
export class CalendarComponent extends CoreComponent implements OnInit {

  @ViewChild(CalendarDayViewComponent) dayView!: CalendarDayViewComponent;

  calendarService: CalendarService;
  snackBar: MatSnackBar;
  selectedDate: Date = new Date();
  appointments: Appointment[] = [];

  constructor(protected override injector: Injector) {
    super(injector);
    this.calendarService = injector.get(CalendarService);
    this.snackBar = injector.get(MatSnackBar);
  }

  ngOnInit(): void {
    this.getAppointments();
  }

  addAppointment(): void {
    this.dayView.addAppointment();
  }

  // Mock Api call to get appointments
  getAppointments(): void {
    const from = new Date(this.selectedDate);
    from.setHours(0, 0, 0, 0);
    const to = new Date(this.selectedDate);
    to.setHours(23, 59, 59, 999);

    this.setSubs = this.calendarService.getAppointments(from, to).pipe().subscribe(result => {
      this.appointments = result;
    });
  }

  // Mock Api call to save appointments
  saveAppointment(appointment: Appointment): void {
    this.setSubs = this.calendarService.saveAppointment(appointment).subscribe(result => {
      this.appointments = result;
      this.snackBar.open('Appointments saved successfully', 'close', {
        duration: 4000,
      });
    });
  }

  // Mock Api call to delete appointments
  deleteAppointment(appointment: Appointment): void {
    this.setSubs = this.calendarService.deleteAppointment(appointment).subscribe((result: boolean) => {
      if (result) {
        this.getAppointments();
        this.snackBar.open('Appointment deleted successfully', 'close', {
          duration: 4000,
        });
      }else{
        this.snackBar.open('Appointment can not deleted', 'close', {
          duration: 4000,
        });
      }
    });
  }

  updateFormDate(value: Date): void {
    if (!value) return;
    this.selectedDate = value;
    this.getAppointments();
  }
}
