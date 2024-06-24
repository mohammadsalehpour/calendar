import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'calendar',
        loadComponent: () => import('./features/calendar/calendar.component').then(module => module.CalendarComponent),
        data: { "title": "Calendar" },
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then(module => module.HomeComponent),
        data: { "title": "Home" },
    },
]

