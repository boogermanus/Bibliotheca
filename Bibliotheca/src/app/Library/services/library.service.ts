import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILibrary } from '../interfaces/ilibrary';
import { AppConfig } from '../../config';
import { ILibraryUser } from '../interfaces/ilibrary-user';
import { ILibraryBookshelf } from '../interfaces/ilibrary-bookshelf';

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

  public getLibraryUsers(libraryId: number): Observable<ILibraryUser[]> {
    return this.httpClient.get<ILibraryUser[]>(`${AppConfig.LibraryApi}/${libraryId}/GetLibraryUsers`);
  }

  public addLibraryUser(username: string, libraryid: number): Observable<ILibraryUser> {
    const params = new HttpParams()
      .append('email', username)
      .append('libraryId', libraryid);

      return this.httpClient.post<ILibraryUser>(`${AppConfig.LibraryApi}/AddLibraryUser`, null ,{params});
  }

  public deleteLibraryUser(libraryUserId: number): Observable<ILibraryUser> {
    return this.httpClient.delete<ILibraryUser>(`${AppConfig.LibraryApi}/DeleteLibraryUser/${libraryUserId}`);
  }

  public getLibraryBookshelves(libraryId: number): Observable<ILibraryBookshelf[]> {
    return this.httpClient.get<ILibraryBookshelf[]>(`${AppConfig.LibraryApi}/${libraryId}/GetLibraryBookshelves`);
  }
}
