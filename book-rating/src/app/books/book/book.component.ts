import { Component, input } from '@angular/core';
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
}
