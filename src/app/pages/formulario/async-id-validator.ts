import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { ProductoService } from '../../services/producto.service';

export function idExistsValidator(productoService: ProductoService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return control.valueChanges.pipe(
      debounceTime(300),
      switchMap(id => productoService.validateProduct(id)),
      map(exists => (exists ? { idExists: true } : null)),
      catchError(() => of(null))
    );
  };
}
