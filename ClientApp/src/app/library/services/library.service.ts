import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { ApiService } from 'src/app/services/api-service';
import { ILibrary } from '../models/ilibrary';

@Injectable()
export class LibraryService {

  private readonly libraryUrl = 'api/library';
  private userId: string;
  constructor(private apiService: ApiService) {
  }

  public getAll(): Observable<ILibrary[]> {
    return this.apiService.get<ILibrary[]>(this.libraryUrl);
  }

  public getAllForUser(): Observable<ILibrary[]> {
    return this.apiService.post<ILibrary[]>(`${this.libraryUrl}/getlibrariesforuser`, null);
  }

  public add(name: string): Observable<ILibrary> {

    const data: ILibrary = {
      name,
      createdOn: new Date(),
      userId: this.userId
    };

    return this.apiService.post<ILibrary>(this.libraryUrl, data);
  }

  public delete(id: number): Observable<ILibrary> {
    return this.apiService.delete<ILibrary>(`${this.libraryUrl}/${id}`);
  }
}
