import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  ValidatorFn,
  ValidationErrors,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { AgeCalculatorComponent } from '../age-calculator/age-calculator.component';

@Component({
  selector: 'app-birthday-input',
  standalone: true,
  imports: [ReactiveFormsModule, AgeCalculatorComponent],
  templateUrl: './birthday-input.component.html',
  styleUrl: './birthday-input.component.scss',
})
export class BirthdayInputComponent {
  birthdayForm = this.fb.group(
    {
      day: [
        undefined,
        [Validators.required, Validators.min(1), Validators.max(31)],
      ],
      month: [
        undefined,
        [Validators.required, Validators.min(1), Validators.max(12)],
      ],
      year: [undefined, [Validators.required]],
    },
    {
      updateOn: 'blur',
      validators: dateValidator,
    }
  );

  public age: {
    years: number | string;
    months: number | string;
    days: number | string;
  } | null = null;

  get Age() {
    return this.age;
  }

  onSubmit() {
    if (!this.birthdayForm.valid) {
      return (this.age = null);
    }

    let date = new Date(
      this.birthdayForm.value.year!,
      this.birthdayForm.value.month! - 1,
      this.birthdayForm.value.day!
    );

    date.setFullYear(this.birthdayForm.value.year!);

    let diff = Math.floor(new Date().getTime() - date.getTime());
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
    const years = Math.floor(diff / millisecondsInYear);
    const remainingMilliseconds = diff % millisecondsInYear;

    const millisecondsInMonth = millisecondsInYear / 12;
    const months = Math.floor(remainingMilliseconds / millisecondsInMonth);
    const days = Math.floor(
      (remainingMilliseconds % millisecondsInMonth) / (1000 * 60 * 60 * 24)
    );

    return (this.age = {
      days: days || '0',
      months: months || '0',
      years: years || '0',
    });
  }

  getValidationMessage(controlName: string): string | null {
    const control = this.birthdayForm.get(controlName);
    if (control && control.invalid && control.touched) {
      if (control.hasError('required')) {
        return 'This field is required';
      } else if (control.hasError('min')) {
        return `Minimum ${controlName} is ${control.errors?.['min'].min}`;
      } else if (control.hasError('max')) {
        return `Maximum ${controlName} is ${control.errors?.['max'].max}`;
      }
    }
    return null;
  }

  constructor(private fb: FormBuilder) {}
}

export const dateValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const day = control.get('day')!.value;
  const month = control.get('month')!.value;
  const year = control.get('year')!.value;

  if (!day || !month || !year) return null;

  const date = new Date(year, month - 1, day);
  const isDateValid =
    date && date.getMonth() + 1 === month && date.getDate() === Number(day);

  if (!isDateValid) return { invalidDate: true };
  if (!isOldDate(date)) return { futureDate: true };
  return null;
};

function isOldDate(date: Date) {
  return date < new Date();
}
