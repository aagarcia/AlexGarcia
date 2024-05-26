import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddbuttonComponent } from '../addbutton/addbutton.component';
import { IProducto } from 'src/app/interfaces/producto.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, AddbuttonComponent, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Input() productos: IProducto[] = [];
  @Output() resultados: EventEmitter<IProducto[]> = new EventEmitter<IProducto[]>();

  searchTerm: string = '';

  buscarProductos(): void {
    if (this.searchTerm) {
      const resultadosBusqueda = this.productos.filter(producto =>
        producto.name.includes(this.searchTerm)
      );
      this.resultados.emit(resultadosBusqueda);
    } else {
      this.resultados.emit(this.productos);
    }
  }
}
