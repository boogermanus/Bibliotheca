import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {BookService} from "./services/book.service";

@Component({
  selector: 'app-base-form',
  template: ``,
})
export class BaseFormComponent implements OnInit, OnDestroy {
  protected readonly bookService = inject(BookService);
  protected readonly formBuilder = inject(FormBuilder);
  public subjectControl: FormControl<string> = new FormControl<string>('', [Validators.required]);
  ngOnInit(): void {

  }
  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }
  protected form: FormGroup;
  protected subscriptions: Subscription = new Subscription();
  protected isControlInvalid(control: AbstractControl, error: string = 'required'): boolean {
    return control.touched && control.hasError(error);
  }
}
