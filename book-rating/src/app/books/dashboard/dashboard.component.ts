import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookComponent } from "../book/book.component";
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { DatePipe } from '@angular/common';
import { interval, map, startWith, timer } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  imports: [BookComponent, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy {
  books = signal<Book[]>([]);

  #rs = inject(BookRatingService);
  #bs = inject(BookStoreService);

  readonly currentDate = toSignal(
    interval(1000).pipe(
      map(() => Date.now()),
      startWith(Date.now())
    ),
    { requireSync: true }
  );

  constructor() {
    this.#bs.getAll().subscribe(books => {
      this.books.set(books);
    });
  }

  doRateUp(book: Book) {
    const ratedBook = this.#rs.rateUp(book);
    this.#updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.#rs.rateDown(book);
    this.#updateList(ratedBook);
  }

  #updateList(ratedBook: Book) {
    // [1,2,3,4,5].map(e => e * 10) // [10, 20, 30, 40, 50]
    // [1,2,3,4,5,5,6,7,8,9,10].filter(e => e > 6) // [7,8,9,10]

    // this.books.set(this.books().map(b => b.isbn === ratedBook.isbn ? ratedBook : b))

    this.books.update(books => books.map(b => {
      if (b.isbn === ratedBook.isbn) {
        return ratedBook;
      } else {
        return b
      }
    }));
  }

  doDelete(book: Book) {
    if (!confirm('Buch löschen?')) {
      return;
    }

    this.#bs.delete(book.isbn).subscribe(() => {
      this.books.update(books => books.filter(b => b.isbn !== book.isbn));
    });
  }

  ngOnDestroy(): void {
    // clearInterval(this.#interval);
  }
}
