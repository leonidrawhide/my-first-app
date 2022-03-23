import { AbstractControl } from '@angular/forms';

export function ValidateCyrillic(control: AbstractControl) {
  const cyrillicLetters = /^[А-Яа-я]+$/
  if (!cyrillicLetters.test(control.value)) {
    return { invalidCyrillic: true };
  }
  return null;
}