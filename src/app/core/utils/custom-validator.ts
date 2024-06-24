import { AbstractControl, ValidationErrors } from '@angular/forms';

export function toValidtor(control: AbstractControl): ValidationErrors | null {
  const to = control.value;
  const from = control.parent?.get('from')?.value;
  if (control.parent) {
    if (from.getTime() > to.getTime() || from.getTime() === to.getTime()) {
      return { invalidTime: true };
    }
  }

  return from;
}

export function getValidationMessage(validationErr: any, ref: string): string {
  if (validationErr.required) {
    return 'The ' + ref + ' field is required';
  } else if (validationErr.invalidTime) {
    return 'The end time should be later than the start time';
  } else {
    return '';
  }
}
