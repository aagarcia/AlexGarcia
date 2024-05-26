import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addbutton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './addbutton.component.html',
  styleUrls: ['./addbutton.component.css']
})
export class AddbuttonComponent {
  @Input() icon: string = 'assets/plus.svg';

  constructor(private router: Router){}

  onClick(): void {
    this.router.navigate(['/post']);
  }
}
