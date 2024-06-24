import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from './calendar.interface';
import { IsDateBetween, UUID } from '../../core/utils/utility';

@Injectable()
export class CalendarService {

  storageKey = 'ngx-calendar-appointments';
  appointments: Appointment[] = [
    {
      guid: '',
      title: 'testAppointment',
      description: 'some description',
      from: new Date(2024, 4, 15, 5, 30, 0, 0),
      to: new Date(2024, 4, 15, 7, 15, 0, 0),
    },
    {
      guid: '',
      title: 'new appointment',
      description: 'some new description',
      from: new Date(2024, 4, 15, 21, 0, 0, 0),
      to: new Date(2024, 4, 15, 23, 45, 0, 0),
    },
    {
      guid: '',
      title: 'new appointment',
      description: 'some new description',
      from: new Date(2024, 4, 16, 8, 0, 0, 0),
      to: new Date(2024, 4, 16, 10, 15, 0, 0),
    }
  ];

  constructor() {
    let appointments: Appointment[] = this.appointments;
    const storageAppointments = localStorage.getItem(this.storageKey);
    if (storageAppointments) appointments = JSON.parse(storageAppointments);
    if (appointments.length > 0) {
      console.log(appointments)
      this.appointments = appointments.map(app => (app != null ? { ...app, from: new Date(app.from), to: new Date(app.to), guid: app.guid || UUID() } : <Appointment>{}));
    }


  }

  getAppointments(from: Date, to: Date) {
    return new Observable<Appointment[]>((observer) => {
      const appointments = this.appointments.filter(app => IsDateBetween(app.from, from, to));
      observer.next(appointments);
      observer.complete();
    })
  }

  saveAppointment(appointment: Appointment) {
    const from = new Date(appointment.from);
    from.setHours(0, 0, 0, 0);
    const to = new Date(appointment.from);
    to.setHours(23, 59, 59, 999);

    return new Observable<Appointment[]>((observer) => {
      if (!appointment.guid) this.appointments.push({ ...appointment, guid: UUID() });
      else {
        const index = this.appointments.findIndex(f => f.guid === appointment.guid);
        this.appointments[index] = appointment;
      }
      const appointments = this.appointments.filter(app => IsDateBetween(app.from, from, to))
      this.addToStorage();

      observer.next(appointments);
      observer.complete();
    })
  }

  deleteAppointment(appointment: Appointment) {
    const itemIndex = this.appointments.findIndex((value) => value.guid == appointment.guid);
    this.appointments.splice(itemIndex, 1);
    this.addToStorage();

    return new Observable<boolean>((observer) => {
      observer.next(true);
      observer.complete();
    });
  }

  private addToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.appointments));
  }
}
