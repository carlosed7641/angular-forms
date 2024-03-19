import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Super Mario', Validators.required],
      ['FIFA', Validators.required],
    ])
  });

  newFavoriteGame: FormControl = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder) { }

  get favoriteGames() {
   return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: string): boolean | null {

    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors
    && formArray.controls[index].touched
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

  addToFavorites() {

    if(this.newFavoriteGame.invalid) return

    const newGame = this.newFavoriteGame.value


    this.favoriteGames.push(this.fb.control(newGame))

    this.newFavoriteGame.reset()

  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }


    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([])

    this.myForm.reset();
  }

}
