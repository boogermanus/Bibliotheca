import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseAuthComponent } from '../base-auth.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginModel } from '../models/login-model';
import { IAuthResponse } from '../interfaces/iauth-response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends BaseAuthComponent implements OnDestroy {

  public loginError: boolean = false;
  public otherLoginError: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
    ) {

    super();

    this.form = this.formBuilder.group({
      email: this.emailControl,
      password: this.passwordControl
    });
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public register(): void {
    this.router.navigate(['/register'])
  }

  public login(): void {
    this.subscriptions = this.authService.login(
      new LoginModel(this.emailControl.value, this.passwordControl.value)
    )
    .subscribe({
      next: (response) => this.handleLogin(response),
      error: (error) => this.handleLoginError(error)
    })
  }

  private handleLogin(response: IAuthResponse): void {
    this.authService.authenticate(response);
    this.router.navigate(['/']);
  }

  private handleLoginError(error: any): void {
    if(error.status === 401) {
      this.loginError = true;
      this.otherLoginError = false;
    }
    else {
      this.otherLoginError = true
      this.loginError = false;
      console.log(error);
    }
  }
}
