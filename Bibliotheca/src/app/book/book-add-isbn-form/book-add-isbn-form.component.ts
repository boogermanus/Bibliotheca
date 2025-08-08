import {Component, inject, signal} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BaseFormComponent} from "../base-form";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BookService} from "../services/book.service";
import {IOpenLibraryBook} from "../interfaces/iopen-library-book";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {catchError, map, Observable, switchMap, tap} from "rxjs";
import {Title} from "@angular/platform-browser";

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
  private readonly Enter_Key = 'Enter';
  public isbnSearch = signal<string>('')
  public searching = false;
  public errorOnSearch = false;
  public openLibraryBook: IOpenLibraryBook;

  public titleControl: FormControl<string> = new FormControl<string>({value: '', disabled: true});

  override ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: this.titleControl
    });
  }
  public lookup(event: KeyboardEvent) {
    if (event.key === this.Enter_Key) {
      this.loadOpenLibraryBook();
    }
  }

  public loadOpenLibraryBook(): void {
    this.searching = true;
    this.errorOnSearch = false;

    this.subscriptions.add(
      this.bookService.getOpenLibraryBook(this.isbnSearch())
        .subscribe({
          next: (book: IOpenLibraryBook) => {
            this.openLibraryBook = book;
            this.searching = false;
            this.setFormData()
          },
          error: (error: Error) => {
            console.log(error);
            this.searching = false;
            this.openLibraryBook = null;
            this.errorOnSearch = true;
            this.form.reset();
          },
        })
    );

    // this.openLibraryBook$ = this.bookService.getOpenLibraryBook(this.isbnSearch())
    //   .pipe(tap(() => {
    //       this.searching = true;
    //     }), map((data) => {
    //       this.searching = false;
    //       return data;
    //     }),
    //     catchError(error => {
    //       console.log(error);
    //       this.errorOnSearch = true;
    //       this.searching = false;
    //       return null;
    //     }),
    //     tap(() => this.searching = false));
  }

  private setFormData(): void {
    this.titleControl.setValue(this.openLibraryBook.title);
  }

  public submit(): void {

  }

  protected readonly Title = Title;
}
