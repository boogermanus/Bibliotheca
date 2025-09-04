import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subscription, tap} from "rxjs";
import {BookService} from "./services/book.service";
import {ILibrary} from "../library/interfaces/ilibrary";
import {ILibraryBookshelf} from "../library/interfaces/ilibrary-bookshelf";
import {LibraryService} from "../library/services/library.service";
import {MatSelectChange} from "@angular/material/select";
import {IBook} from "./interfaces/ibook";

@Component({
  selector: 'app-base-form',
  template: ``,
})
export class BaseFormComponent implements OnInit, OnDestroy {
  protected readonly bookService = inject(BookService);
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly libraryService = inject(LibraryService)

  public libraries: Observable<ILibrary[]>
  public bookshelves: Observable<ILibraryBookshelf[]>

  public titleControl: FormControl<string> =
    new FormControl<string>('', [Validators.required, Validators.maxLength(300)]);
  public subjectControl: FormControl<string> = new FormControl<string>('', [Validators.required, Validators.maxLength(100)]);
  public authorControl: FormControl<string> =
    new FormControl<string>('', [Validators.required, Validators.maxLength(300)]);
  public formatControl: FormControl<string> =
    new FormControl<string>('', [Validators.required, Validators.maxLength(100)]);
  public isbn13Control: FormControl<string> =
    new FormControl<string>('', [Validators.minLength(13), Validators.pattern('[0-9]*')]);
  public isbn10Control: FormControl<string> =
    new FormControl<string>('', [Validators.minLength(10), Validators.pattern('[0-9]*')]);
  public pagesControl: FormControl<number> = new FormControl<number>(1,[Validators.required, Validators.min(1)]);
  public publishControl: FormControl<Date> = new FormControl<Date>(new Date(), Validators.required);
  public descControl: FormControl<string> = new FormControl<string>('');
  public libraryControl: FormControl<number> = new FormControl<number>(null, Validators.required);
  public rowControl: FormControl<number> = new FormControl<number>(1, Validators.required);
  public bookshelfControl: FormControl<any> = new FormControl<any>('', Validators.required);
  public bookshelfRows: number = 0;
  ngOnInit(): void {
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
    this.libraries = this.libraryService.getLibrariesForUser()
      .pipe(tap(items => {
        if(items && items.length === 1) {
          this.libraryControl.setValue(items[0].id)
          this.bookshelves = this.libraryService.getLibraryBookshelves(items[0].id);
          this.bookshelfControl.enable();
          this.rowControl.enable();
        }
      }));
  }
  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }
  protected form: FormGroup;
  protected subscriptions: Subscription = new Subscription();
  protected isControlInvalid(control: AbstractControl, error: string = 'required'): boolean {
    return control.touched && control.hasError(error);
  }

  public librarySelected(event: MatSelectChange): void {
    this.bookshelves = this.libraryService.getLibraryBookshelves(event.value);
    this.bookshelfControl.enable();
  }

  public bookshelfSelected(event: MatSelectChange): void {
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
