import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorService {

  firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  cantBeStrider = (control: FormControl): ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase();

    if (value === 'strider') return {
      noStrider: true
    }

    return null

  }

  isValidField(form: FormGroup, field: string): boolean | null {

    return form.controls[field].errors && form.controls[field].touched
  }

  isFieldOneEqualToFieldTwo(field1: string, field2: string) {
      return (formGroup: FormGroup ): ValidationErrors | null => {

        const fieldVale1 = formGroup.get(field1)?.value;
        const fieldVale2 = formGroup.get(field2)?.value;

        if (fieldVale1 !== fieldVale2) {
          formGroup.get(field2)?.setErrors({ notEqual: true });
          return { notEqual: true }
        }

        formGroup.get(field2)?.setErrors(null);

        return null;
      }
  }

}
