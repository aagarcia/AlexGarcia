import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, 
         FormControl, FormGroup, 
         ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { idValidator } from '../../utils/product-validators';
import { convertirDate, convertirDatetoString, 
         convertirFecha, futureOrTodayDateValidator, 
         parseDateString } from '../../utils/custom-validators';
import { IProducto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  registroForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    logo: new FormControl(''),
    fechaLiberacion: new FormControl(''),
    fechaRevision: new FormControl('')
  });
  submitted: boolean = false;
  id: string = '';
  producto: IProducto = {} as IProducto;
  showPopup: boolean = false;
  popupMessage: string = '';
  isUpdate: boolean = false;
  IDValidator: ValidatorFn[] = [Validators.required,
                                Validators.minLength(3),
                                Validators.maxLength(10)];

  nombraValidator: ValidatorFn[] = [Validators.required,
                                    Validators.minLength(5),
                                    Validators.maxLength(100)];

  descripcionValidator: ValidatorFn[] = [Validators.required,
                                         Validators.minLength(10),
                                         Validators.maxLength(200)];

  logoValidator: ValidatorFn[] = [Validators.required];

  fechaLiberacionValidator: ValidatorFn[] = [Validators.required,
                                             futureOrTodayDateValidator()];

  requiredValidator: ValidatorFn[] = [Validators.required];

  constructor(private formBuilder: FormBuilder, 
              private activatedRoute: ActivatedRoute,
              private productoService: ProductoService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'] === undefined ? '' : params['id'];
      if(this.id !== '') {
        this.productoService.getProduct(this.id).subscribe({
          next: (data) => {
            this.producto = data;
            this.isUpdate = true;
            this.updateDataInit();
          },
          error: (error) => {
            console.error(`${error.name} - ${error.message}`);
            this.router.navigate(['/']);
          }
        });
      } else {
        this.insertDataInit();
      }
    });

    this.setFechaRevision();
  }

  insertDataInit(): void {
    this.registroForm = this.formBuilder.group({
      id: ['', this.IDValidator,
           [idValidator(this.productoService)]],
      nombre: ['', this.nombraValidator],
      descripcion: ['', this.descripcionValidator],
      logo: ['', this.logoValidator],
      fechaLiberacion: ['', this.fechaLiberacionValidator],
      fechaRevision: [{value: '', disabled: true}, this.requiredValidator],
    });

    this.setFechaRevision();
  }
  
  updateDataInit(): void {
    this.registroForm = this.formBuilder.group({
      id: [{value: this.producto.id, disabled: true}],
      nombre: [this.producto.name, this.nombraValidator],
      descripcion: [this.producto.description, this.descripcionValidator],
      logo: [this.producto.logo, this.logoValidator],
      fechaLiberacion: [convertirDatetoString(this.producto.date_release), 
                        this.fechaLiberacionValidator],
      fechaRevision: [{value: convertirDate(this.producto.date_revision), disabled: true}, 
                      this.requiredValidator],
    });
    this.setFechaRevision();
  }

  setFechaRevision(): void {
    this.registroForm.get('fechaLiberacion')?.valueChanges.subscribe(value => {
      if (value) {
        const selectedDate = new Date(value);
        const nextYear = selectedDate.getFullYear() + 1;
        const nextYearDate = new Date(nextYear, selectedDate.getMonth(), selectedDate.getDate()+1);
        const formattedNextYear = nextYearDate.toLocaleDateString('en-GB');
        this.registroForm.get('fechaRevision')?.setValue(formattedNextYear);
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registroForm.controls;
  }

  onSubmit(): void {

    this.submitted = true;
    this.registroForm.get('fechaRevision')?.enable();

    if (this.registroForm.invalid) {
      this.registroForm.get('fechaRevision')?.disable();
      return;
    }

    this.registroForm.value.fechaRevision = convertirFecha(this.registroForm.value.fechaRevision);
    
    if(this.isUpdate) {
      this.updateData();
    } else {
      this.insertData();
    }
    
  }

  insertData(): void {
    this.producto = {
      id: this.registroForm.value.id,
      name: this.registroForm.value.nombre,
      description: this.registroForm.value.descripcion,
      logo: this.registroForm.value.logo,
      date_release: new Date(this.registroForm.value.fechaLiberacion),
      date_revision: new Date(this.registroForm.value.fechaRevision),
    };

    this.productoService.postProducts(this.producto).subscribe({
      next: (data) => {
        this.submitted = false;
        this.registroForm.reset();
        this.registroForm.get('fechaRevision')?.disable();
        this.showPopupMessage(data.message, true);
      },
      error: (error) => {
        this.registroForm.get('fechaRevision')?.disable();
        this.showPopupMessage(error.message, false);
      }
    });
  }

  updateData(): void {
    this.producto = {
      id: this.producto.id,
      name: this.registroForm.value.nombre,
      description: this.registroForm.value.descripcion,
      logo: this.registroForm.value.logo,
      date_release: parseDateString(this.registroForm.value.fechaLiberacion),
      date_revision: parseDateString(this.registroForm.value.fechaRevision),
    };

    this.productoService.putProducts(this.producto.id, this.producto).subscribe({
      next: (data) => {
        this.submitted = false;
        this.registroForm.reset();
        this.registroForm.get('fechaRevision')?.disable();
        this.showPopupMessage(data.message, true);
      },
      error: (error) => {
        this.registroForm.get('fechaRevision')?.disable();
        this.showPopupMessage(error.message, false);
      }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.registroForm.reset();
  }

  showPopupMessage(message: string, redirect: boolean): void {
    this.popupMessage = message;
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
      if (redirect) {
        this.router.navigate(['/']);
      }
    }, 2000);
  }

  closePopup(): void {
    this.showPopup = false;
  }
}
