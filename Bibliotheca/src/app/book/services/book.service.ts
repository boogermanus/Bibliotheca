import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBook } from '../interfaces/ibook';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public addBook(book: IBook): Observable<IBook> {
    return this.httpClient.post<IBook>(`${AppConfig.BookApi}/AddBook`, book);
  }
}