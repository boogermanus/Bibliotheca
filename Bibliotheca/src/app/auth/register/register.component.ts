import { Component, OnInit, signal } from '@angular/core';
import { BaseAuthComponent } from '../base-auth.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInput,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends BaseAuthComponent implements OnInit {
  public confirmPasswordControl: FormControl = new FormControl('', Validators.compose([Validators.required]));

  constructor(
    private readonly formBuilder: FormBuilder,
  ) {
    super();

    this.form = this.formBuilder.group({
      email: this.emailControl,
      password: this.passwordControl,
      confirmPassword: this.confirmPasswordControl
    });
  }

  ngOnInit(): void {
    this.subscriptions.unsubscribe();
  }

  public submit(): void {
    const password = this.passwordControl.value as string;
    const confirm = this.confirmPasswordControl.value as string;

    if(password !== confirm) {
      this.passwordsDoNotMatch.set(true);
      return;
    }

  }

}
