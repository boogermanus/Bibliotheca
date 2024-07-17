import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAddFormComponent } from './book-add-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BookService } from '../services/book.service';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('BookAddFormComponent', () => {
  let component: BookAddFormComponent;
  let fixture: ComponentFixture<BookAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAddFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        BookService,
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
