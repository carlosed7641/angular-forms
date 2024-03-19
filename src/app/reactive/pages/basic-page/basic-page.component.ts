import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const product = {
  name: 'Camiseta',
  price: 2_500,
  inStorage: 10,
}

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styles: ``
})

export class BasicPageComponent {

  // myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // })

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  })

  constructor(private fb: FormBuilder) { }

  // ngOnInit(): void {
  //   //this.myForm.reset(product);
  // }

  isValidField(field: string): boolean | null {

    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  getFieldErrorMessage(field: string): string | null {

    if (!this.myForm.controls[field]) return null

    const errors = this.myForm.controls[field].errors || {}

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `Mínimo ${errors[key].requiredLength} caracteres`
      }
    }

    return null
  }

  onSave() {

    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset({ price: 10, inStorage: 0 });

  }


}
