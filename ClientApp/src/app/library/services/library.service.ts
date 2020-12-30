import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api-service';
import { LibraryModule } from '../library.module';
import { ILibrary } from '../models/ilibrary';

@Injectable()
export class LibraryService {

  private readonly libraryUrl = 'api/library';
  constructor(private apiService: ApiService) { }

  public getAll(): Observable<ILibrary[]> {
    return this.apiService.get<ILibrary[]>(this.libraryUrl);
  }
}
