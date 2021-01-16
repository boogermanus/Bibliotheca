import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  public post<T>(path: string, body: T, params?: HttpParams): Observable<T> {
    const headers: HttpHeaders = new HttpHeaders().append('Content-Type', 'application/json');
    return this.httpClient.post<T>(this.getUrl(path), body, {params, headers});
  }

  public put<T>(path: string, body: any, params?: HttpParams): Observable<T> {
    return this.httpClient.put<T>(this.getUrl(path), body, {params});
  }

  public delete<T>(path: string, params?: HttpParams): Observable<T> {
    return this.httpClient.delete<T>(this.getUrl(path), {params});
  }

}
