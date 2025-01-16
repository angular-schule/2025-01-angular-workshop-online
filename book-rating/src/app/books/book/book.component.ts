import { Component, effect, input, output } from '@angular/core';
import { Book } from '../shared/book';
import { CurrencyPipe } from '@angular/common';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-book',
  imports: [CurrencyPipe, RatingComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  // Input: hier fließen Daten von der Elternkomponente hinein
  // von oben nach unten
  book = input.required<Book>();

  // Output: hier fließen Daten von hier zur Elternkomponente
  // von unten nach oben
  rateUp = output<Book>();
  rateDown = output<Book>();

  doRateUp() {
    this.rateUp.emit(this.book());
  }

  doRateDown() {
    this.rateDown.emit(this.book());
  }
}
