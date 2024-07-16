import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { LibraryService } from '../../library/services/library.service';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { ILibrary } from '../../library/interfaces/ilibrary';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-book-add-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatSelectModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './book-add-form.component.html',
  styleUrl: './book-add-form.component.css'
})
export class BookAddFormComponent implements OnInit {
  public libraries: Observable<ILibrary[]>
  public libraryControl: FormControl<string> = new FormControl<string>('', Validators.required);
  public form: FormGroup
  public titleControl: FormControl<string> = 
    new FormControl<string>('', Validators.compose([Validators.required, Validators.maxLength(300)]));
  public authorControl: FormControl<string> =
    new FormControl<string>('', Validators.compose([Validators.required, Validators.maxLength(300)]));

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly libraryService: LibraryService
  ) {
    this.form = this.formBuilder.group({
      titleControl: this.titleControl,
      libraryControl: this.libraryControl,
      authorControl: this.authorControl
    });
  }

  ngOnInit(): void {
    this.libraries = this.libraryService.getLibrariesForUser();
  }
}
