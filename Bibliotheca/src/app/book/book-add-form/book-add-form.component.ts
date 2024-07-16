import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { LibraryService } from '../../library/services/library.service';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { ILibrary } from '../../library/interfaces/ilibrary';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ILibraryBookshelf } from '../../library/interfaces/ilibrary-bookshelf';
import { MatButtonModule } from '@angular/material/button';

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

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly libraryService: LibraryService
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
    this.formObject = this.form.getRawValue();
  }

  public reset(): void {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.pagesControl.setValue(1);
    this.rowControl.setValue(1);
    this.bookshelfControl.disable();
    this.rowControl.disable();
  }
}
