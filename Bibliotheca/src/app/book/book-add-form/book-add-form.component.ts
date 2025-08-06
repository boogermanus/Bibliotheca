import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {LibraryService} from '../../library/services/library.service';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {Observable, Subscription} from 'rxjs';
import {ILibrary} from '../../library/interfaces/ilibrary';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {ILibraryBookshelf} from '../../library/interfaces/ilibrary-bookshelf';
import {MatButtonModule} from '@angular/material/button';
import {BookService} from '../services/book.service';
import {IBook} from '../interfaces/ibook';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {MatTooltipModule} from "@angular/material/tooltip";
import {BaseFormComponent} from "../base-form";

@Component({
  selector: 'app-book-add-form',
  imports: [
    MatCardModule,
    MatSelectModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatTooltipModule
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './book-add-form.component.html',
  styleUrl: './book-add-form.component.css'
})
export class BookAddFormComponent extends BaseFormComponent implements OnInit {
  public libraries: Observable<ILibrary[]>
  public bookshelves: Observable<ILibraryBookshelf[]>

  public titleControl: FormControl<string> =
    new FormControl<string>('', Validators.compose([Validators.required, Validators.maxLength(300)]));
  public authorControl: FormControl<string> =
    new FormControl<string>('', Validators.compose([Validators.required, Validators.maxLength(300)]));
  public subjectControl: FormControl<string> =
    new FormControl<string>('', Validators.compose([Validators.required, Validators.maxLength(100)]));
  public formatControl: FormControl<string> =
    new FormControl<string>('', Validators.compose([Validators.required, Validators.maxLength(100)]));
  public isbn13Control: FormControl<string> =
    new FormControl<string>('', Validators.compose([Validators.minLength(13), Validators.pattern('[0-9]*')]));
  public isbn10Control: FormControl<string> =
    new FormControl<string>('', Validators.compose([Validators.minLength(10), Validators.pattern('[0-9]*')]));
  public pagesControl: FormControl<number> = new FormControl<number>(1, Validators.compose([Validators.required, Validators.min(1)]));
  public publishControl: FormControl<Date> = new FormControl<Date>(new Date(), Validators.required);
  public descControl: FormControl<string> = new FormControl<string>('');
  public libraryControl: FormControl<string> = new FormControl<string>('', Validators.required);
  public rowControl: FormControl<number> = new FormControl<number>(1, Validators.required);
  public bookshelfControl: FormControl<any> = new FormControl<any>('', Validators.required);
  public bookshelfRows: number = 0;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly libraryService: LibraryService,
    private readonly bookService: BookService,
  ) {
    super();
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

  override ngOnInit(): void {
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
      libraryId: +this.libraryControl.value,
      libraryBookshelfId: this.bookshelfControl.value.id,
      row: this.rowControl.value
    }

    this.subscriptions.add(this.bookService.addBook(newBook)
      .subscribe({
        next: () => {
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
    this.rowControl.disable();
    this.subscriptions.unsubscribe();
  }
}
