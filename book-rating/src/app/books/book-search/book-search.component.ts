import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BookStoreService } from '../shared/book-store.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, filter, map, of, switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-search',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss'
})
export class BookSearchComponent {
  searchControl = new FormControl('', { nonNullable: true });

  #bs = inject(BookStoreService);

  books = toSignal(this.searchControl.valueChanges.pipe(
    filter(term => term.length >= 3),
    debounceTime(200),
    switchMap(term => this.#bs.search(term))
  ));

  /*books = toSignal(this.searchControl.valueChanges.pipe(
    debounceTime(200),
    switchMap(term => {
      if (term.length >= 3) {
        return this.#bs.search(term);
      } else {
        return of([]);
      }
    })
  ));*/
}
