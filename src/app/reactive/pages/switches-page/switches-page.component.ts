import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    terms: [false, Validators.requiredTrue]
  });

  person = {
    gender: 'F',
    wantNotifications: true
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
   this.myForm.reset(this.person);
  }


  isValidField(field: string): boolean | null {

    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { terms, ...newPerson } = this.myForm.value;

    this.person = newPerson;




  }
}
