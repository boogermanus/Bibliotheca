import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { BookTableComponent } from "../book-table/book-table.component";

@Component({
    selector: 'app-books',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        BookTableComponent
    ],
    templateUrl: './books.component.html',
    styleUrl: './books.component.css'
})
export class BooksComponent {

  constructor(private readonly router: Router) {}

  public bookAddForm(): void {
    this.router.navigate(['/book-add-form']);
  }

  public bookAddIsbnForm(): void {
    this.router.navigate(['/book-add-isbn-form']);
  }
}
