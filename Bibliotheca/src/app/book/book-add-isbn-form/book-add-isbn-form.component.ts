import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {BaseFormComponent} from "../base-form";

@Component({
  selector: 'app-book-add-isbn-form',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './book-add-isbn-form.component.html',
  styleUrl: './book-add-isbn-form.component.css'
})
export class BookAddIsbnFormComponent extends BaseFormComponent {

}
