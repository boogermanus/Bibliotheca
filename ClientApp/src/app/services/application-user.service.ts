import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApplicationUser } from '../models/iapplication-user';
import { ApiService } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationUserService {

  private readonly applicationUserUrl = 'api/applicationuser';
  constructor(private apiService: ApiService) { }

  public getUsersForLibrary(libraryId: number): Observable<IApplicationUser> {
    return this.apiService.get<IApplicationUser>(`${this.applicationUserUrl}/usersforlibrary/${libraryId}`);
  }
}
