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

export function convertirDate(referenceDate: Date): string {
  const date = new Date(referenceDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

export function convertirDatetoString(referenceDate: Date): string {
  const date = new Date(referenceDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son base 0, así que sumamos 1
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function convertirFecha(fecha: string): string {
  const partes = fecha.split('/');
  return `${partes[2]}-${partes[1]}-${partes[0]}`;
}

export function parseDateString (dateString: string): Date {
  const dateParts = dateString.split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Adjust month index for 0-based indexing
  const day = parseInt(dateParts[2], 10);

  const localDate = new Date(year, month, day);
  const timezoneOffset = localDate.getTimezoneOffset() * 60 * 1000;
  const utcDate = new Date(localDate.getTime() + timezoneOffset);

  return utcDate;
};

export function formatDateToString(date: Date): string {
    let fecha: Date = new Date(date);
    const day = fecha.getDate().toString().length === 1 ? `0${fecha.getDate()}` : fecha.getDate().toString();
    const month = (fecha.getMonth() + 1).toString().length === 1 ? `0${(fecha.getMonth() + 1)}` : (fecha.getMonth() + 1).toString();
    const year = fecha.getFullYear();
    return `${day}/${month}/${year}`;
}
