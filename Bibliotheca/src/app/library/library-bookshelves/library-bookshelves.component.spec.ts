import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookshelvesComponent } from './library-bookshelves.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LibraryService } from '../services/library.service';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('LibraryBookshelvesComponent', () => {
  let component: LibraryBookshelvesComponent;
  let fixture: ComponentFixture<LibraryBookshelvesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookshelvesComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        LibraryService,
        provideAnimations()
      ]
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
