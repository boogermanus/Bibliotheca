import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailComponent } from './book-detail.component';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book.service';
import { of } from 'rxjs';
import { IBook } from '../interfaces/ibook';

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

    const data: IBook = {
      id: 1,
      title: '',
      author: '',
      subject: '',
      format: '',
      isbn13: '',
      isbn10: '',
      numberOfPages: 1,
      publishDate: new Date(),
      description: '',
      libraryId: 1,
      library: { name: '', createDate: new Date(), bookCount: 1 },
      libraryBookshelfId: 1,
      libraryBookshelf: { name: '', libraryId: 1, numberOfRows: 1 },
      row: 1
    }
    
    service.getBookForUser.and.returnValue(of(data))
    
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();



  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });
});
