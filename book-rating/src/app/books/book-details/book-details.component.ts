import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { map, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-book-details',
  imports: [RouterLink, AsyncPipe, JsonPipe],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  #route = inject(ActivatedRoute);
  #bs = inject(BookStoreService);

  readonly book = signal<Book | undefined>(undefined);

  book$ = this.#route.paramMap.pipe(
    map(params => params.get('isbn')!),
    switchMap(isbn => this.#bs.getSingle(isbn))
  );

  constructor() {
    // PULL
    // const isbn = this.#route.snapshot.paramMap.get('isbn'); // path: 'books/:isbn'

    // PUSH

  }
}
