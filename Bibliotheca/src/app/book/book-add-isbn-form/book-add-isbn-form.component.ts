import {Component, inject, signal} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BaseFormComponent} from "../base-form";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BookService} from "../services/book.service";
import {IOpenLibraryBook} from "../interfaces/iopen-library-book";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-book-add-isbn-form',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './book-add-isbn-form.component.html',
  styleUrl: './book-add-isbn-form.component.css'
})
export class BookAddIsbnFormComponent extends BaseFormComponent {
  private readonly bookService = inject(BookService)
  public isbnSearch = signal<string>('')
  public searching = false;
  public openLibraryBook: IOpenLibraryBook;

  public lookup(event: KeyboardEvent) {

    // todo constant for 'enter'
    if (event.key === 'Enter') {
      this.loadOpenLibraryBook();
    }
  }

  public loadOpenLibraryBook(): void {
    this.searching = true;
    this.subscriptions.add(
      this.bookService.getOpenLibraryBook(this.isbnSearch())
        .subscribe({
          next: (book: IOpenLibraryBook) => {
            this.openLibraryBook = book;
            this.searching = false;
          },
          error: (error: Error) => {
            console.log(error);
            this.searching = false;
            this.openLibraryBook = null;
          },
        })
    );
  }
}
