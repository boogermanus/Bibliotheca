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
import {IOpenLibraryBook} from "../interfaces/iopen-library-book";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {CameraDialogComponent} from "../camera-dialog/camera-dialog.component";

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
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './book-add-isbn-form.component.html',
  styleUrl: './book-add-isbn-form.component.css'
})
export class BookAddIsbnFormComponent extends BaseFormComponent {
  private readonly Enter_Key = 'Enter';
  public isbnSearch = signal<string>('')
  public searching = false;
  public errorOnSearch = false;
  public openLibraryBook: IOpenLibraryBook;
  public dialog = inject(MatDialog)

  override ngOnInit(): void {
    super.ngOnInit();

    this.titleControl.disable();
    this.authorControl.disable();
    this.isbn13Control.disable();
    this.isbn10Control.disable();
    this.publishControl.disable();
  }

  public lookup(event: KeyboardEvent) {
    if (event.key === this.Enter_Key) {
      this.loadOpenLibraryBook();
    }
  }

  public loadOpenLibraryBook(): void {
    this.searching = true;
    this.errorOnSearch = false;
    const search = this.isbnSearch().replaceAll('-', '');

    this.subscriptions.add(
      this.bookService.getOpenLibraryBook(search)
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
    this.authorControl.setValue(this.openLibraryBook.author);
    this.isbn13Control.setValue(this.openLibraryBook.isbn13);
    this.isbn10Control.setValue(this.openLibraryBook.isbn10);
    this.publishControl.setValue(this.openLibraryBook.publishDate);
    this.pagesControl.setValue(this.openLibraryBook.numberOfPages);
  }

  public openCameraDialog(): void {
    const dialogRef = this.dialog.open(CameraDialogComponent, {
      height: '500px',
      width: '500px'
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.isbnSearch.set(result);
        }
      })
    );
  }
}
