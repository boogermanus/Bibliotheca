import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryDetailComponent } from './library-detail.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { LibraryService } from '../services/library.service';
import { ILibrary } from '../interfaces/ilibrary';

describe('LibraryDetailComponent', () => {
  let component: LibraryDetailComponent;
  let fixture: ComponentFixture<LibraryDetailComponent>;
  let input: ILibrary;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryDetailComponent],
      providers: [
        // provideRouter([]),
        provideHttpClient(),
        // provideHttpClientTesting(),
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryDetailComponent);
    component = fixture.componentInstance;    
    input = {id: 0, name: 'test', createDate: new Date(), libraryBookshelves: [], libraryUsers: []};
    component.library = input;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
