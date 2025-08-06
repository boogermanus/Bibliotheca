import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BookService } from '../services/book.service';
import { IBook } from '../interfaces/ibook';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-book-table',
    imports: [
        MatTableModule,
        CommonModule,
        MatPaginatorModule,
        RouterModule
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
  ]
  public dataSource: MatTableDataSource<IBook>;

  @ViewChild(MatPaginator)paginator: MatPaginator

  constructor(
    private readonly bookService: BookService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.bookService.getBooksForUser()
      .subscribe({
        next: (books) => {
          this.dataSource = new MatTableDataSource<IBook>(books);
          this.dataSource.paginator = this.paginator;
        }
      });
  }

  public viewBookDetail(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }

}
