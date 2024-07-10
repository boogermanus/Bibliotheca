import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookshelvesComponent } from './library-bookshelves.component';

describe('LibraryBookshelvesComponent', () => {
  let component: LibraryBookshelvesComponent;
  let fixture: ComponentFixture<LibraryBookshelvesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookshelvesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryBookshelvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
