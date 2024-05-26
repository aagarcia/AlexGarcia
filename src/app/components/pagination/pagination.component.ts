import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems: number = 0;
  elementoPorPagina: number = 5;
  totalPaginas: number = 1;
  paginaActual: number = 1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems'].currentValue && !changes['totalItems'].firstChange) {
      this.totalPaginas = Math.ceil(this.totalItems / this.elementoPorPagina);
    }
  }
}
