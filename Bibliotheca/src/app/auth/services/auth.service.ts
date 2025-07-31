import {inject, Injectable, signal} from '@angular/core';
import { AppConfig } from '../../config';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegisterModel } from '../models/register-model';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login-model';
import { IAuthResponse } from '../interfaces/iauth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient);

  private readonly AUTH_URL = AppConfig.authApi;
  private readonly TOKEN = 'bib_token';
  private readonly USER_ID = 'bib_userid';
  private readonly EMAIL = 'bib_email';

  private _isAuthenticated = signal(false);
  public readonly isAuthenticated = this._isAuthenticated.asReadonly();
  public get token(): string | null {
    return localStorage.getItem(this.TOKEN);
  }

  constructor(
    private readonly jwtService: JwtHelperService
  ) {

    if (this.hasValidToken()) {
      this._isAuthenticated.set(true);
    }
  }

  public register(model: RegisterModel): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.AUTH_URL}/register`, model);
  }

  public login(model: LoginModel): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>(`${this.AUTH_URL}/login`, model);
  }

  public authenticate(response: IAuthResponse): void {
    localStorage.setItem(this.TOKEN, response.token);
    const decoded: any = this.jwtService.decodeToken(response.token);
    if (decoded.nameid) {
      localStorage.setItem(this.USER_ID, decoded.nameid);
    }

    if (decoded.email) {
      localStorage.setItem(this.EMAIL, decoded.email);
    }
    this._isAuthenticated.set(true);
  }

  public userId(): string {
    return localStorage.getItem(this.USER_ID);
  }

  public username(): string {
    return localStorage.getItem(this.EMAIL);
  }

  public logout(): void {
    localStorage.clear();
    this._isAuthenticated.set(false);
  }

  private hasValidToken(): boolean {
    return !this.jwtService.isTokenExpired(localStorage.getItem(this.TOKEN));
  }
}
