import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-library-bookshelves',
  standalone: true,
  imports: [
    MatListModule
  ],
  templateUrl: './library-bookshelves.component.html',
  styleUrl: './library-bookshelves.component.css'
})
export class LibraryBookshelvesComponent {

}
