import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LibraryService } from '../Services/library.service';
import { Observable, Subscription } from 'rxjs';
import { ILibrary } from '../Interfaces/ilibrary';
import { CommonModule } from '@angular/common';

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
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './libraries.component.html',
  styleUrl: './libraries.component.css'
})
export class LibrariesComponent implements OnInit {
  public form: FormGroup
  public libraryName: FormControl = new FormControl('', Validators.required)
  public subscriptions: Subscription = new Subscription();
  public libraries: Observable<ILibrary[]>

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly libraryService: LibraryService
  )
  {
    this.form = this.formBuilder.group({
      libraryName: this.libraryName
    });
  }

  ngOnInit(): void {
    this.libraries = this.libraryService.getLibrariesForUser();
  }

  public submit(): void {
    
  }
}
