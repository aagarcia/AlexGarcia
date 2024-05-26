import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, 
         FormControl, FormGroup, 
         ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { idValidator } from './product-validators';
import { futureOrTodayDateValidator } from './custom-validators';
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

  updateDataInit(): void {
    this.registroForm = this.formBuilder.group({
      id: [{value: this.producto.id, disabled: true}],
      nombre: [this.producto.name, 
               [Validators.required,
                Validators.minLength(5),
                Validators.maxLength(100)]
      ],
      descripcion: [this.producto.description, 
                    [Validators.required,
                     Validators.minLength(10),
                     Validators.maxLength(200)]
      ],
      logo: [this.producto.logo, 
             [Validators.required]
      ],
      fechaLiberacion: [this.convertirDatetoString(this.producto.date_release), 
                        [Validators.required,
                         futureOrTodayDateValidator()],
      ],
      fechaRevision: [{value: this.convertirDate(this.producto.date_revision), disabled: true}, [Validators.required]],
    });
    this.setFechaRevision();
  }

  insertDataInit(): void {
    this.registroForm = this.formBuilder.group({
      id: ['', 
           [Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10)],
           [idValidator(this.productoService)]],
      nombre: ['', 
               [Validators.required,
                Validators.minLength(5),
                Validators.maxLength(100)]
      ],
      descripcion: ['', 
                    [Validators.required,
                     Validators.minLength(10),
                     Validators.maxLength(200)]
      ],
      logo: ['', 
             [Validators.required]
      ],
      fechaLiberacion: ['', 
                        [Validators.required,
                         futureOrTodayDateValidator()],
      ],
      fechaRevision: [{value: '', disabled: true}, [Validators.required]],
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
    
    if(this.isUpdate) {
      this.updateData();
    } else {
      this.insertData();
    }
    
  }

  insertData(): void {
    this.submitted = true;
    this.registroForm.get('fechaRevision')?.enable();

    if (this.registroForm.invalid) {
      this.registroForm.get('fechaRevision')?.disable();
      return;
    }

    this.registroForm.value.fechaRevision = this.convertirFecha(this.registroForm.value.fechaRevision);

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
    this.submitted = true;
    this.registroForm.get('fechaRevision')?.enable();

    if (this.registroForm.invalid) {
      this.registroForm.get('fechaRevision')?.disable();
      return;
    }

    this.registroForm.value.fechaRevision = this.convertirFecha(this.registroForm.value.fechaRevision);

    this.producto = {
      id: this.producto.id,
      name: this.registroForm.value.nombre,
      description: this.registroForm.value.descripcion,
      logo: this.registroForm.value.logo,
      date_release: this.parseDateString(this.registroForm.value.fechaLiberacion),
      date_revision: this.parseDateString(this.registroForm.value.fechaRevision),
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

  parseDateString (dateString: string): Date {
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Adjust month index for 0-based indexing
    const day = parseInt(dateParts[2], 10);

    const localDate = new Date(year, month, day);
    const timezoneOffset = localDate.getTimezoneOffset() * 60 * 1000;
    const utcDate = new Date(localDate.getTime() + timezoneOffset);

    return utcDate;
  };

  onReset(): void {
    this.submitted = false;
    this.registroForm.reset();
  }

  convertirFecha(fecha: string): string {
    const partes = fecha.split('/');
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
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

  convertirDatetoString(referenceDate: Date): string {
    const date = new Date(referenceDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son base 0, así que sumamos 1
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  convertirDate(referenceDate: Date): string {
    const date = new Date(referenceDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son base 0, así que sumamos 1
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
}
