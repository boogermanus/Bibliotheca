import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { BaseAuthComponent } from '../base-auth.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInput,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends BaseAuthComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router) {

    super();

    this.form = this.formBuilder.group({
      email: this.emailControl,
      password: this.passwordControl
    });
  }
  
  ngOnInit(): void {
    this.subscriptions.unsubscribe();
  }

  public register(): void {
    this.router.navigate(['/register'])
  }

}
