import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CdkDrag, CdkDragEnd, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Appointment } from '../calendar.interface';
import { Subject } from 'rxjs/internal/Subject';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { AppointmentInfoComponent } from '../appointment-info/appointment-info.component';
import { AppointmentDeleteModalComponent } from '../appointment-delete-modal/appointment-delete-modal.component';
import { DiffMinutes } from '../../../core/utils/utility';

@Component({
  selector: 'app-calendar-day-view',
  standalone: true,
  templateUrl: './calendar-day-view.component.html',
  styleUrls: ['./calendar-day-view.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatChipsModule, MatCardModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatListModule, AppointmentModalComponent, CdkDropListGroup, CdkDropList, CdkDrag],
})
export class CalendarDayViewComponent implements OnInit, OnDestroy {
  @ViewChild('parent') parent!: ElementRef;
  @Input() set appointments(appointments: Appointment[]) {
    this.calculateAppointmentPosition([...appointments]);
  }
  @Input({ required: true }) set selectedDate(date: Date) {
    this._date = date;
    this.calculateCurrentPosition();
    this.calculateAppointmentPosition();
  }
  @Output() save = new EventEmitter<Appointment>();
  @Output() delete = new EventEmitter<Appointment>();

  _date!: Date;
  rowHeight = 52;
  currentPosition = 0;
  _appointments: Appointment[] = [];
  draggingRow!: { index: number, data: Appointment };
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);
  protected unsubscribe$ = new Subject<void>();

  get selectedDate(): Date { return this._date; }
  get appointments(): Appointment[] { return this._appointments; }

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.calculateCurrentPosition();
    setInterval(() => this.calculateCurrentPosition(), 60000);
  }

  calculateCurrentPosition() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    this.currentPosition = (hours * this.rowHeight) + (minutes * (this.rowHeight / 60));
  }

  calculateAppointmentPosition(appointments?: Appointment[]) {
    this._appointments = (appointments || this.appointments).map(app => {
      const diff = DiffMinutes(app.from, app.to);
      const height = (this.rowHeight / 60) * diff;
      const top = (app.from.getHours() * this.rowHeight) + (app.from.getMinutes() * (this.rowHeight / 60));
      return { ...app, top, height, small: height < 35 };
    });
  }

  addAppointment(hour?: number, ref?: string): void {
    let from;
    let to;
    let isNull;
    if(ref === 'row'){
      const _hour: number = hour || this.selectedDate.getHours();
      from = new Date(this.selectedDate);
      to = new Date(from);
      from.setHours(_hour, 0, 0, 0);
      to.setHours(_hour + 1, 0, 0, 0);
      isNull = false;
    } else {
      from = new Date(0, 0, 0, 0);
      to = new Date(0, 0, 0, 1);
      isNull = true;
    }
    this.dialog.open(AppointmentModalComponent, { width: '500px', data: { from, to, actionType: "Add", isNull: isNull } })
      .afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((result: Appointment) => {
        if (!result) return;
        this.save.emit(result);
      });
  }

  deleteAppointment(evt: MouseEvent, appointment: Appointment) {
    evt?.stopPropagation();
    const dialog = this.dialog.open(AppointmentDeleteModalComponent, {
      width: '250px',
      data : appointment
    });
    dialog.afterClosed().subscribe(result => {
      if (!result) return;
      this.delete.emit(appointment);
    });
  }

  editAppointment(evt: MouseEvent, appointment: Appointment) {
    evt?.stopPropagation();
    appointment.actionType = "Edit";
    this.dialog.open(AppointmentModalComponent, { width: '500px', data: appointment })
      .afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((result: Appointment) => {
      if (!result) return;
      this.save.emit(result);
    });
  }

  showAppointmentInfo(appointment: Appointment) {
    this.dialog.open(AppointmentInfoComponent, { width: '450px', data: appointment })
      .afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((result: Appointment) => {
        console.log(result);
      });
  }

  computeDragRenderPos() {
    const quarterHeight = this.rowHeight / 4;
    return (pos: { x: number; y: number; }) => ({ x: pos.x, y: (pos.y / quarterHeight) * quarterHeight });
  }

  dragStart(data: Appointment, index: number) {
    this.draggingRow = { index, data };
  }

  dropped(evt: CdkDragEnd<Appointment>) {
    const parentRect = (this.parent.nativeElement).getBoundingClientRect();
    const row = (evt.dropPoint.y - parentRect.top) / this.rowHeight;
    const [hours, minutes] = row.toFixed(2).split('.');

    const diff = DiffMinutes(this.draggingRow.data.from, this.draggingRow.data.to);
    const from = new Date(this.draggingRow.data.from);
    from.setHours(+hours, (60 / 100) * +minutes, 0, 0);
    const to = new Date(from);
    to.setMinutes(diff + from.getMinutes());

    const changedAppointment: Appointment = { ...this.draggingRow.data, from, to, top: 0, height: 0 };
    this.save.emit(changedAppointment);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
