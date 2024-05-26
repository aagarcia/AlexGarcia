import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FormComponent } from 'src/app/components/form/form.component';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormComponent],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

}
