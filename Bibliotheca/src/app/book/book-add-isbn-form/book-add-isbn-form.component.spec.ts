import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAddIsbnFormComponent } from './book-add-isbn-form.component';

describe('BookAddIsbnFormComponent', () => {
  let component: BookAddIsbnFormComponent;
  let fixture: ComponentFixture<BookAddIsbnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAddIsbnFormComponent]
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
