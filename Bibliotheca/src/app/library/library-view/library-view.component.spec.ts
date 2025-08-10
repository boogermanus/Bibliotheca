import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryViewComponent } from './library-view.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('LibraryViewComponent', () => {
  let component: LibraryViewComponent;
  let fixture: ComponentFixture<LibraryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryViewComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
