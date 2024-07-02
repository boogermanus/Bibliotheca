import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { BaseAuthComponent } from '../base-auth.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RegisterModel } from '../models/register-model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInput,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends BaseAuthComponent implements OnDestroy {
  public confirmPasswordControl: FormControl = new FormControl('', Validators.compose([Validators.required]));
  public registerSuccessful: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {
    super();

    this.form = this.formBuilder.group({
      email: this.emailControl,
      password: this.passwordControl,
      confirmPassword: this.confirmPasswordControl
    }, {
      validators: this.passwordValidator,
      updateOn: 'change'
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public submit(): void {
    this.subscriptions = this.authService.register(new RegisterModel(
      this.emailControl.value, this.passwordControl.value, this.confirmPasswordControl.value)
    ).subscribe({
      next: (response) => {
        if (response) {
          this.registerSuccessful = true;
        }
      }
    });
  }

}
