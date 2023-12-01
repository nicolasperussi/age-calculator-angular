import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BirthdayInputComponent } from './components/birthday-input/birthday-input.component';
import { AgeCalculatorComponent } from './components/age-calculator/age-calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    BirthdayInputComponent,
    AgeCalculatorComponent,
  ],
  template: `<app-birthday-input />`,
  styles: ``,
})
export class AppComponent {}
