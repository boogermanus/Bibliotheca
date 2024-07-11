import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from '../services/library.service';
import { Observable, Subscription } from 'rxjs';
import { ILibraryBookshelf } from '../interfaces/ilibrary-bookshelf';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { HttpErrorResponse } from '@angular/common/http';

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
export class LibraryBookshelvesComponent implements OnInit, OnDestroy {
  public libraryId: number;
  public libraryBookshelvels: Observable<ILibraryBookshelf[]>;
  public subscriptions: Subscription = new Subscription();
  public errorMessage: string = '';
  @ViewChild('bookshelfInput')bookshelfInput: ElementRef;
  @ViewChild('rowInput')rowInput: ElementRef;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly libraryService: LibraryService
  ) {
    this.libraryId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.libraryBookshelvels = this.libraryService.getLibraryBookshelves(this.libraryId);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  public add(name: string, numberOfRows: number): void {
    let data: ILibraryBookshelf = { name, numberOfRows, libraryId: this.libraryId };
    this.subscriptions.add(this.libraryService.addLibraryBookshelf(data)
      .subscribe({
        next: () => {
          this.libraryBookshelvels = this.libraryService.getLibraryBookshelves(this.libraryId);
          this.bookshelfInput.nativeElement.value = ''
          this.rowInput.nativeElement.value = ''
          this.errorMessage = ''
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = error.error;
        }
      }));
  }

  public delete(id: number): void {
    this.subscriptions.add(this.libraryService.deleteLibraryBookshelf(id)
      .subscribe({
        next: () => {
          this.libraryBookshelvels = this.libraryService.getLibraryBookshelves(this.libraryId);
        }
      }));
  }
}
