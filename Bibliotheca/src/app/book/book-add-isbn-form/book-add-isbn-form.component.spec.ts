import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAddIsbnFormComponent } from './book-add-isbn-form.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('BookAddIsbnFormComponent', () => {
  let component: BookAddIsbnFormComponent;
  let fixture: ComponentFixture<BookAddIsbnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAddIsbnFormComponent],
      providers: [provideHttpClient(), { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1 } } } }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookAddIsbnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
