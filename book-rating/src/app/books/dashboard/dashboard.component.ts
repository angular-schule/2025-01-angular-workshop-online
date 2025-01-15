import { Component, signal } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  books = signal<Book[]>([]);

  constructor() {
    this.books.set([
      {
        isbn: '123',
        title: 'Angular',
        description: 'Grundlagen und mehr',
        price: 42.9,
        rating: 5
      },
      {
        isbn: '456',
        title: 'Vue.js',
        description: 'Das grüne Framework',
        price: 36.9,
        rating: 3
      }
    ]);
  }
}


/*
TODO: Bücher anzeigen

- Datenmodell
- Daten
- Anzeige
  - Komponente für EIN Buch

*/
