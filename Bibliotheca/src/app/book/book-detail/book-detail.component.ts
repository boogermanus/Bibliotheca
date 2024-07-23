import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable, Subscription } from 'rxjs';
import { IBook } from '../interfaces/ibook';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit, OnDestroy {
  public loadError: boolean = false;
  public book: IBook;
  public bookId: number;
  public subscriptions: Subscription = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly bookService: BookService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['id'];
    this.subscriptions.add(
      this.bookService.getBookforUser(this.bookId)
        .subscribe({
          next: (book) => this.book = book,
          error: () => this.loadError = true
        },
        )
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public back(): void {
    this.router.navigate(['/books']);
  }

  public delete(): void {
    this.subscriptions.add(
      this.bookService.deleteBook(this.bookId)
        .subscribe({
          next: () => this.back()
        }));
  }
}
