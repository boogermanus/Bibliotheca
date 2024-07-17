import { TestBed } from '@angular/core/testing';

import { LibraryService } from './library.service';
import { provideHttpClient } from '@angular/common/http';

describe('LibraryService', () => {
  let service: LibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(LibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
