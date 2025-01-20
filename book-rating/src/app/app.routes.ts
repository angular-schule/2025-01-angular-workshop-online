import { Routes } from '@angular/router';
// import { booksRoutes } from './books/books.routes';

export const routes: Routes = [
  // bei Weiterleitung vom leeren Pfad immer mit pathMatch:full
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  // ...booksRoutes
  {
    path: 'books',
    loadChildren: () => import('./books/books.routes').then(m => m.booksRoutes)
  }
];
