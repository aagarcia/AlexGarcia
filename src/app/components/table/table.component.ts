import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { IProducto } from 'src/app/interfaces/producto.interface';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, PaginationComponent, SkeletonComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {
    
    @Input() productos: IProducto[] = [];
    @Output() resultados: EventEmitter<IProducto[]> = new EventEmitter<IProducto[]>();
    totalItems: number = 0;
    isLoading: boolean = true;
    dropdownOpenProductId: string | null = null;
    isPopupVisible: boolean = false;
    productoAEliminar: IProducto | null = null;
    productosPorPagina: number = 5;
    paginaActual: number = 1;
    totalPaginas: number = 1;

    constructor (private router: Router, private productoService: ProductoService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['productos'].currentValue && !changes['productos'].firstChange) {
            this.checkProductosCargados();
        }
    }

    private checkProductosCargados(): void {
        this.isLoading = false;
        this.totalItems = this.productos.length;
    }

    toggleDropdown(productId: string): void {
        if (this.dropdownOpenProductId === productId) {
            this.dropdownOpenProductId = null;
        } else {
            this.dropdownOpenProductId = productId;
        }
    }

    isDropdownOpen(productId: string): boolean {
        return this.dropdownOpenProductId === productId;
    }

    modifyProduct(productId: string): void {
        this.router.navigate([`/put/${productId}`]);
        this.closeDropdown();
    }

    confirmDeleteProduct(producto: IProducto): void {
        this.productoAEliminar = producto;
        this.isPopupVisible = true;
        this.closeDropdown();
    }

    closePopup(): void {
        this.isPopupVisible = false;
        this.productoAEliminar = null;
    }

    deleteProduct(): void {
        if (this.productoAEliminar) {
            this.productoService.deleteProducts(this.productoAEliminar.id).subscribe({
                next: (data) => {
                    this.productos = this.productos.filter(p => p.id !== this.productoAEliminar?.id);
                    this.resultados.emit(this.productos);
                    console.log(data.message);
                    this.closePopup();
                    this.checkProductosCargados();
                },
                error: (error) => {
                    console.error(`${error.name} - ${error.message}`);
                    this.closePopup();
                }
            });
        }
    }

    closeDropdown(): void {
        this.dropdownOpenProductId = null;
    }

    formatDateToString(date: Date): string {
        let fecha: Date = new Date(date);
        const day = fecha.getDate().toString().length === 1 ? `0${fecha.getDate()}` : fecha.getDate().toString();
        const month = (fecha.getMonth() + 1).toString().length === 1 ? `0${(fecha.getMonth() + 1)}` : (fecha.getMonth() + 1).toString();
        const year = fecha.getFullYear();
        return `${day}/${month}/${year}`;
    }
}
