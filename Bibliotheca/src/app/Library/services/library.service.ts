import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILibrary } from '../Interfaces/ilibrary';
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
}
