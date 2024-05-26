import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { ProductoService } from 'src/app/services/producto.service';
import { IProducto } from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SearchComponent, TableComponent],
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  productos: IProducto[] = [];
  resultadosBusqueda: IProducto[] = [];
  

  constructor(private productService: ProductoService){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((response) => {
      this.productos = response.data;
      this.resultadosBusqueda = this.productos;
    });
  }

  handleResultados(resultados: IProducto[]): void {
    this.resultadosBusqueda = resultados;
  }
}
