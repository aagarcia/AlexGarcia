import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureOrTodayDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputDate = new Date(control.value);
    inputDate.setHours(0, 0, 0, 0);
    inputDate.setDate(inputDate.getDate() + 1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return inputDate >= today ? null : { futureOrTodayDate: true };
  };
}
