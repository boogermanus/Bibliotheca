import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibrariesComponent } from './libraries.component';
import { LibraryService } from '../services/library.service';
import { FormBuilder } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('LibrariesComponent', () => {
  let component: LibrariesComponent;
  let fixture: ComponentFixture<LibrariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrariesComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        LibraryService,
        FormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
