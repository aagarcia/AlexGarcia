import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ProductoService } from '../../services/producto.service';

export function idValidator(productoService: ProductoService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return productoService.validateProduct(control.value).pipe(
      map(isValid => (isValid ? { idExists: true } : null)),
      catchError(() => of(null))
    );
  };
}
