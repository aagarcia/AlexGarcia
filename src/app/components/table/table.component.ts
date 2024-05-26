import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { IProducto } from 'src/app/interfaces/producto.interface';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, PaginationComponent, SkeletonComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {
    
    @Input() productos: IProducto[] = [];
    totalItems: number = 0;
    isLoading: boolean = true;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['productos'].currentValue && !changes['productos'].firstChange) {
            this.checkProductosCargados();
        }
    }

    private checkProductosCargados(): void {
        this.isLoading = false;
        this.totalItems = this.productos.length;
    }
}
