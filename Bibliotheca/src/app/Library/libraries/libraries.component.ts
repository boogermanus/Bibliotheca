import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
// import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LibraryService } from '../services/library.service'
import { Observable, Subscription } from 'rxjs';
import { ILibrary } from '../interfaces/ilibrary';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-libraries',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    // MatListModule,
    ReactiveFormsModule,
    CommonModule,
    MatExpansionModule
  ],
  templateUrl: './libraries.component.html',
  styleUrl: './libraries.component.css'
})
export class LibrariesComponent implements OnInit, OnDestroy {
  public form: FormGroup
  public libraryName: FormControl = new FormControl('', Validators.required)
  public subscriptions: Subscription = new Subscription();
  public libraries: Observable<ILibrary[]>

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly libraryService: LibraryService
  ) {
    this.form = this.formBuilder.group({
      libraryName: this.libraryName
    });
  }

  ngOnInit(): void {
    this.libraries = this.libraryService.getLibrariesForUser();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public submit(): void {
    this.subscriptions.add(
      this.libraryService.addLibrary(this.libraryName.value)
        .subscribe({
          next: () => {
            this.libraries = this.libraryService.getLibrariesForUser();
          }
        }));
  }

  public delete(libraryId: number): void {
    this.subscriptions.add(
      this.libraryService.deleteLibrary(libraryId)
        .subscribe({
          next: () => {
            this.libraries = this.libraryService.getLibrariesForUser()
          }
        }));
  }
}
