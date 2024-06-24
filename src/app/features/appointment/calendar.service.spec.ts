import { CalendarService } from './calendar.service';
import { Appointment } from './calendar.interface';

describe('CalendarService', () => {
  let calendarService: CalendarService;

  beforeEach(() => {
    calendarService = new CalendarService();
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');
  });

  it('should be created', () => {
    expect(calendarService).toBeTruthy();
  });

  it('should retrieve appointments within a date range', () => {
    const from = new Date(2024, 4, 15, 0, 0, 0, 0);
    const to = new Date(2024, 4, 15, 23, 59, 59, 999);

    calendarService.getAppointments(from, to).subscribe(appointment => {
      expect(appointment.length).toBe(2);
    });
  });

  it('should save a new appointment', (done) => {
  const appointment: Appointment = {
    guid: '',
    title: 'New Test Appointment',
    description: 'Test description',
    from: new Date(2024, 4, 16, 10, 0, 0, 0),
    to: new Date(2024, 4, 16, 12, 0, 0, 0)
  };
  calendarService.saveAppointment(appointment).subscribe(savedAppointments => {
    expect(savedAppointments.length).toBe(2);
    expect(localStorage.setItem).toHaveBeenCalled();
    done();
  });
});

  it('should delete an appointment', () => {
    const appointment: Appointment = {
      guid: 'guid-to-delete',
      title: 'Test Appointment to Delete',
      description: 'Test description',
      from: new Date(2024, 4, 15, 21, 0, 0, 0),
      to: new Date(2024, 4, 15, 23, 45, 0, 0)
    };
    calendarService.deleteAppointment(appointment).subscribe(remainingAppointments => {
      expect(remainingAppointments.length).toBe(2);
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });
});