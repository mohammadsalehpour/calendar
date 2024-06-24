import { FormControl } from "@angular/forms";

export interface Appointment {
    guid: string;
    title: string;
    description: string;
    from: Date;
    to: Date;
    top?: number;
    height?: number;
    small?: boolean;
    actionType?: string;
    isNull?: boolean;
}

export interface HourItem {
    key: string;
    hour: number;
    quarter: number;
}

export type ToFormControl<T> = {
    [P in keyof T]: FormControl<T[P] | null>;
}