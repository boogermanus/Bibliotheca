import { OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

export class BaseAuthComponent {
    protected form:FormGroup;
    protected emailControl: FormControl = new FormControl('',Validators.compose([Validators.required, Validators.email]));
    protected passwordControl: FormControl = new FormControl('',Validators.compose([Validators.required]));
    protected subscriptions: Subscription = new Subscription();

    constructor() {}
    protected isControlInvalid(control: AbstractControl, error: string = 'required'): boolean {
        return control.touched && control.hasError(error);
    }

    protected passwordValidator(control: AbstractControl): ValidationErrors {
        const password = control.get('password');
        const confirm = control.get('confirmPassword');

        if(confirm.value !== '' && password.value !== confirm.value) {
            return {password: true}
        }

        return null;
    }

    protected changePasswordValidator(control: AbstractControl): ValidationErrors {
        const password = control.get('newPassword');
        const confirm = control.get('confirmNewPassword');

        if(confirm.value !== '' && password.value !== confirm.value) {
            return {password: true}
        }

        return null;
    }
}