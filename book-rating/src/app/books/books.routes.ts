import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BookDetailsComponent } from "./book-details/book-details.component";
import { BookSearchComponent } from "./book-search/book-search.component";
import { BookCreateComponent } from "./book-create/book-create.component";

export const booksRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'search', component: BookSearchComponent },
  { path: 'create', component: BookCreateComponent },
  { path: ':isbn', component: BookDetailsComponent },
];
