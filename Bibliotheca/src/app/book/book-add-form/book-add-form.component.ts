import {Component, inject, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {LibraryService} from '../../library/services/library.service';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {Observable} from 'rxjs';
import {ILibrary} from '../../library/interfaces/ilibrary';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {ILibraryBookshelf} from '../../library/interfaces/ilibrary-bookshelf';
import {MatButtonModule} from '@angular/material/button';
import {IBook} from '../interfaces/ibook';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {MatTooltipModule} from "@angular/material/tooltip";
import {BaseFormComponent} from "../base-form";

@Component({
  selector: 'app-book-add-form',
  imports: [
    MatCardModule,
    MatSelectModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatTooltipModule
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './book-add-form.component.html',
  styleUrl: './book-add-form.component.css'
})
export class BookAddFormComponent extends BaseFormComponent implements OnInit {
  constructor() {
    super();
  }

}
