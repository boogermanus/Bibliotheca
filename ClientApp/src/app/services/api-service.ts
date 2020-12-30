import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pathToFileURL } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, @Inject('BASE_URL')private baseUrl: string) { }

  public get<T>(path: string, params?: HttpParams): Observable<T> {
    return this.httpClient.get<T>(this.getUrl(path), {params});
  }

  private getUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  public post<T>(path: string, body: any, params?: HttpParams): Observable<T> {
    return this.httpClient.post<T>(this.getUrl(path), body, {params});
  }

  public put<T>(path: string, body: any, params?: HttpParams): Observable<T> {
    return this.httpClient.put<T>(this.getUrl(path), body, {params});
  }

  public delete<T>(path: string, params?: HttpParams): Observable<T> {
    return this.httpClient.delete<T>(this.getUrl(path), {params});
  }
}
