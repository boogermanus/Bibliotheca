import { OnInit, signal } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

export class BaseAuthComponent {
    protected form: FormGroup;
    protected emailControl: FormControl = new FormControl('', Validators.compose([Validators.required, Validators.email]));
    protected passwordControl: FormControl = new FormControl('', Validators.compose([Validators.required]));
    protected subscriptions: Subscription = new Subscription();
    public passwordsDoNotMatch = signal(false);

    constructor() { }

    protected isControlInvalid(control: AbstractControl, error: string = 'required'): boolean {
        return control.touched && control.hasError(error);
    }

    protected passwordValidator(control: AbstractControl): ValidationErrors {
        const password = control.get('password').value as string;
        const confirm = control.get('confirmPassword').value as string;

        if(password.length === confirm.length || confirm.length >= password.length) {
            if(password !== confirm) {
                return {confirmPassword: true}
            }
        }

        return null;
    }
}