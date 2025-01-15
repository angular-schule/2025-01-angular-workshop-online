import { Component, signal } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book',
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  // TODO: Wo kommen diese Daten her?
  book = signal<Book>({ title: '' } as Book)
}
