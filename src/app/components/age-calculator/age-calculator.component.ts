import { Component, Input } from '@angular/core';
import { BirthdayInputComponent } from '../birthday-input/birthday-input.component';

@Component({
  selector: 'app-age-calculator',
  standalone: true,
  imports: [BirthdayInputComponent],
  templateUrl: './age-calculator.component.html',
  styleUrl: './age-calculator.component.scss',
})
export class AgeCalculatorComponent {
  @Input() age: {
    years: number | string;
    months: number | string;
    days: number | string;
  } | null = null;
}
