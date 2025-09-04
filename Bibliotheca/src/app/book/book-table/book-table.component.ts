import {CommonModule} from '@angular/common';
import {Component, inject, model, OnInit, signal, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {BookService} from '../services/book.service';
import {IBook} from '../interfaces/ibook';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {RouterModule} from '@angular/router';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-book-table',
  imports: [
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.css'
})
export class BookTableComponent implements OnInit {

  public displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'subject',
    'library',
    'bookshelf',
    'row'
  ];

  public filterByOptions: string[] = [
    'Title',
    'Author',
    'Subject',
  ]
  public dataSource: MatTableDataSource<IBook>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public filterType = model<string>('title');
  public filterValue = model<string>('');

  private readonly bookService = inject(BookService);
  private originalFilterPredicate: ((data: IBook, filter: string) => boolean) | undefined;

  constructor() {
  }

  public ngOnInit(): void {

    this.bookService.getBooksForUser()
      .subscribe({
        next: (books) => {
          this.dataSource = new MatTableDataSource<IBook>(books);
          this.dataSource.paginator = this.paginator;
          this.originalFilterPredicate = this.dataSource.filterPredicate;
        }
      });
  }

  public filterBooks(): void {
    this.dataSource.filter = this.filterValue();
  }
}
