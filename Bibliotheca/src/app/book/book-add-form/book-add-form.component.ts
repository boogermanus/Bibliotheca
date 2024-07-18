import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { LibraryService } from '../../library/services/library.service';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Observable, Subscription } from 'rxjs';
import { ILibrary } from '../../library/interfaces/ilibrary';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ILibraryBookshelf } from '../../library/interfaces/ilibrary-bookshelf';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from '../services/book.service';
import { IBook } from '../interfaces/ibook';

@Component({
  selector: 'app-book-add-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatSelectModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './book-add-form.component.html',
  styleUrl: './book-add-form.component.css'
})
export class BookAddFormComponent implements OnInit {
  public libraries: Observable<ILibrary[]>
  public bookshelves: Observable<ILibraryBookshelf[]>

  public form: FormGroup
  public titleControl: FormControl =
    new FormControl('', Validators.compose([Validators.required, Validators.maxLength(300)]));
  public authorControl: FormControl =
    new FormControl('', Validators.compose([Validators.required, Validators.maxLength(300)]));
  public subjectControl: FormControl =
    new FormControl('', Validators.compose([Validators.required, Validators.maxLength(100)]));
  public formatControl: FormControl =
    new FormControl('', Validators.compose([Validators.required, Validators.maxLength(100)]));
  public isbn13Control: FormControl = new FormControl('', Validators.maxLength(13));
  public isbn10Control: FormControl = new FormControl('', Validators.maxLength(10));
  public pagesControl: FormControl = new FormControl(1, Validators.compose([Validators.required, Validators.min(1)]));
  public publishControl: FormControl = new FormControl('', Validators.required);
  public descControl: FormControl = new FormControl('');
  public libraryControl: FormControl = new FormControl('', Validators.required);
  public rowControl: FormControl = new FormControl(1, Validators.required);
  public bookshelfControl: FormControl = new FormControl('', Validators.required);

  public bookshelfRows: number = 0;
  public formObject: any;

  public subscriptions: Subscription = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly libraryService: LibraryService,
    private readonly bookService: BookService
  ) {
    this.form = this.formBuilder.group({
      title: this.titleControl,
      author: this.authorControl,
      subject: this.subjectControl,
      format: this.formatControl,
      isbn13: this.isbn13Control,
      isbn10: this.isbn10Control,
      pages: this.pagesControl,
      publish: this.publishControl,
      desc: this.descControl,
      row: this.rowControl,
      library: this.libraryControl,
      bookshelf: this.bookshelfControl
    });

    this.rowControl.disable();
    this.bookshelfControl.disable();
  }

  ngOnInit(): void {
    this.libraries = this.libraryService.getLibrariesForUser();
  }

  librarySelected(event: MatSelectChange): void {
    this.bookshelves = this.libraryService.getLibraryBookshelves(event.value);
    this.bookshelfControl.enable();
  }

  bookshelfSelected(event: MatSelectChange): void {
    this.bookshelfRows = event.value.rows;
    this.rowControl.enable();
  }

  public submit(): void {
    const newBook: IBook = {
      title: this.titleControl.value,
      author: this.authorControl.value,
      subject: this.subjectControl.value,
      format: this.formatControl.value,
      isbn13: this.isbn13Control.value,
      isbn10: this.isbn10Control.value,
      numberOfPages: this.pagesControl.value,
      publishDate: this.publishControl.value,
      description: this.descControl.value,
      libraryId: this.libraryControl.value,
      libraryBookshelfId: this.bookshelfControl.value.id,
      row: this.rowControl.value
    }

    this.subscriptions.add(this.bookService.addBook(newBook)
    .subscribe({
      next: (book) => {
        console.log(book);
        this.reset();
      }
    }))
  }

  public reset(): void {
    this.form.reset({
      pages: 1,
      row: 1
    });
    this.bookshelfControl.disable();
  }

  public isControlInvalid(control: AbstractControl, error: string = 'required') : boolean {
    return control.touched && control.hasError(error);
  }
}
