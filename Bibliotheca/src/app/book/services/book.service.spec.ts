import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AppConfig } from '../../config';

describe('BookService', () => {
  let service: BookService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(BookService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getBookForUser HTTP for GET', () => {
    service.getBookForUser(1).subscribe();
    const req = http.expectOne({url: `${AppConfig.BookApi}/1`, method: 'GET'});
    expect(req.request.method).toBe('GET');
  });

  it('should call getBookForUser HTTP with URL', () => {
    service.getBookForUser(1).subscribe();
    const req = http.expectOne({url: `${AppConfig.BookApi}/1`, method: 'GET'});
    expect(req.request.url).toBe(`${AppConfig.BookApi}/1`);
  });
});
