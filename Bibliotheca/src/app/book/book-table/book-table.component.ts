import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BookService } from '../services/book.service';
import { IBook } from '../interfaces/ibook';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-book-table',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatPaginatorModule
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
    'bookshelf',
    'row'
  ]
  public dataSource: MatTableDataSource<IBook>;

  @ViewChild(MatPaginator)paginator: MatPaginator

  constructor(
    private readonly bookService: BookService
  ) {}

  ngOnInit(): void {
    this.bookService.getBooksForUser()
      .subscribe({
        next: (books) => {
          this.dataSource = new MatTableDataSource<IBook>(books);
          this.dataSource.paginator = this.paginator;
        }
      })
  }

}
