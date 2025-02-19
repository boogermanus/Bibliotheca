import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailComponent } from './book-detail.component';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book.service';
import { of } from 'rxjs';
import { IBook } from '../interfaces/ibook';
import { Book } from '../models/book';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('BookService', ['getBookForUser']);
    await TestBed.configureTestingModule({
      imports: [BookDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1 } } } },
        { provide: BookService, useValue: serviceSpy }
      ],
    })
      .compileComponents();

    let service = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;

    const data: IBook = Book.MockBook();
    
    service.getBookForUser.and.returnValue(of(data))
    
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });
});
