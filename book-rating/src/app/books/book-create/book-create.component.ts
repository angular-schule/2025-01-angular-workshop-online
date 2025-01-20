import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-create',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss'
})
export class BookCreateComponent {

  #bs = inject(BookStoreService);
  #router = inject(Router);

  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(15),
        // Validators.pattern(/^[0-9]*$/)
      ]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(100)
      ]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: []
    }),
    rating: new FormControl(5, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(0)
      ]
    }),
  });

  isInvalid(control: FormControl): boolean {
    return control.invalid && control.touched;
  }

  hasError(control: FormControl, errorCode: string): boolean {
    // Hat dieses Control diesen bestimmten Fehler?
    return control.hasError(errorCode) && control.touched;
  }

  submitForm() {
    // Buch erzeugen
    const newBook: Book = this.bookForm.getRawValue();

    // HTTP
    this.#bs.create(newBook).subscribe({
      next: receivedBook => {
        // alert('Buch wurde angelegt!');
        // this.bookForm.reset();
        this.#router.navigate(['/books', receivedBook.isbn]);
        // this.#router.navigateByUrl('/books/' + receivedBook.isbn);
      },
      error: (err: HttpErrorResponse) => {
        // ...
      }
    });
  }
}
