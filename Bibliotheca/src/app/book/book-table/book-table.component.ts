import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BookService } from '../services/book.service';
import { IBook } from '../interfaces/ibook';

@Component({
  selector: 'app-book-table',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule
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

  constructor(
    private readonly bookService: BookService
  ) {}

  ngOnInit(): void {
    this.bookService.getBooksForUser()
      .subscribe({
        next: (books) => {
          this.dataSource = new MatTableDataSource<IBook>(books);

        }
      })
  }

}
