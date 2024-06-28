import { AbstractControl, ValidationErrors } from '@angular/forms';

export function minSelectedCheckboxes(min = 2) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && control.value.length >= min) {
      return null;
    }
    return { minSelected: true };
  };
}