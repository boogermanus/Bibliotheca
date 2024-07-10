import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILibrary } from '../interfaces/ilibrary';
import { AppConfig } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public getLibrariesForUser(): Observable<ILibrary[]> {
    return this.httpClient.get<ILibrary[]>(`${AppConfig.LibraryApi}/GetLibrariesForUser`);
  }

  public addLibrary(libraryName: string): Observable<ILibrary> {
    return this.httpClient.post<ILibrary>(`${AppConfig.LibraryApi}/AddLibrary`, {name: libraryName});
  }

  public deleteLibrary(libraryId: number): Observable<ILibrary> {
    return this.httpClient.delete<ILibrary>(`${AppConfig.LibraryApi}/${libraryId}`);
  }

  public getLibrary(libraryId: number): Observable<ILibrary> {
    return this.httpClient.get<ILibrary>(`${AppConfig.LibraryApi}/${libraryId}`);
  }
}
