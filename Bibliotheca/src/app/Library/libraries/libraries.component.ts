import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-libraries',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    ReactiveFormsModule
  ],
  templateUrl: './libraries.component.html',
  styleUrl: './libraries.component.css'
})
export class LibrariesComponent {
  public form: FormGroup
  public libraryName: FormControl = new FormControl('', Validators.required)

  constructor(
    private readonly formBuilder: FormBuilder
  )
  {
    this.form = this.formBuilder.group({
      libraryName: this.libraryName
    });
  }

  public submit(): void {
    
  }
}
