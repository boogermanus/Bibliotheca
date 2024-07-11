import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from '../services/library.service';
import { Observable } from 'rxjs';
import { ILibraryBookshelf } from '../interfaces/ilibrary-bookshelf';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-library-bookshelves',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule
  ],
  templateUrl: './library-bookshelves.component.html',
  styleUrl: './library-bookshelves.component.css'
})
export class LibraryBookshelvesComponent implements OnInit {
  public libraryId: number;
  public libraryBookshelvels: Observable<ILibraryBookshelf[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly libraryService: LibraryService
  ) {
    this.libraryId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.libraryBookshelvels = this.libraryService.getLibraryBookshelves(this.libraryId);
  }
}
