import {AbstractControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

export class BaseFormComponent {
  protected form: FormGroup;
  protected isControlInvalid(control: AbstractControl, error: string = 'required'): boolean {
    return control.touched && control.hasError(error);
  }
}
