import { NgModule } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { CalendarDayViewComponent } from '../features/appointment/calendar-day-view/calendar-day-view.component';

const matModules = [
    CalendarDayViewComponent, MatCardModule, MatDatepickerModule, MatIconModule, MatButtonModule,
    MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, RouterLinkActive,

    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
]

@NgModule({
    declarations: [],
    imports: [...matModules],
    exports: [...matModules],
    providers: [],
})
export class SharedModule { }