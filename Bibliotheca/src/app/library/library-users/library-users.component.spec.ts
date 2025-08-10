import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryUsersComponent } from './library-users.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ILibrary } from '../interfaces/ilibrary';

describe('LibraryUsersComponent', () => {
  let component: LibraryUsersComponent;
  let fixture: ComponentFixture<LibraryUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryUsersComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
