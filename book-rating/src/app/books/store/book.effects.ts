import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of, timer } from 'rxjs';
import { BookActions } from './book.actions';
import { BookStoreService } from '../shared/book-store.service';


@Injectable()
export class BookEffects {

  actions$ = inject(Actions);
  #bs = inject(BookStoreService);

  /*
  - wenn Action loadBooks kommt, dann …
  - Bücher laden: BookStoreService.getAll()
    - bei Erfolg: loadBooksSuccess
    - bei Misserfolg: loadBooksFailure
  */

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      // filter(action => action.type === '[Book] Load Books')
      ofType(BookActions.loadBooks),
      concatMap(() => this.#bs.getAll().pipe(
        map(books => BookActions.loadBooksSuccess({ data: books }))
      ))
    )
  });


  /*testEffect$ = createEffect(() => {
    return timer(0, 1000).pipe(
      map(i => {
        return {
          type: 'INTERVAL',
          data: i
        }
      })
    );
  })*/
}
