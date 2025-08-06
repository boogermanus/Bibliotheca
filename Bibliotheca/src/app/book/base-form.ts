import {Component, OnDestroy, OnInit} from "@angular/core";
import {AbstractControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-base-form',
  template: ``,
})
export class BaseFormComponent implements OnInit, OnDestroy {
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
