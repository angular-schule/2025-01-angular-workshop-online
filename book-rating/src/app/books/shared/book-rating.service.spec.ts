import { TestBed } from '@angular/core/testing';

import { BookRatingService } from './book-rating.service';
import { Book } from './book';

describe('BookRatingService', () => {
  let service: BookRatingService;
  let book: Book;

  beforeEach(() => {
    // Arrange
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookRatingService);

    /*book = {
      isbn: '',
      title: '',
      description: '',
      price: 3,
      rating: 3
    };*/
    book = { rating: 3 } as Book; // Type Assertion – gefährlich!
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should rate up a book by one', () => {
    // Arrange
    book.rating = 3;

    // Act
    const ratedBook = service.rateUp(book);

    // Assert
    expect(ratedBook.rating).toBe(4); // NICHT: book.rating + 1
  });

  it('should rate down a book by one', () => {
    book.rating = 5;
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(4);
  });

  it('should not rate below 1', () => {
    book.rating = 1;
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(1);
  });

  it('should not rate above 5', () => {
    book.rating = 5;
    const ratedBook = service.rateUp(book);
    expect(ratedBook.rating).toBe(5);
  });

  it('should only produce integer ratings', () => {
    book.rating = 3;
    const ratedBook = service.rateUp(book);
    const roundedRating = Math.round(ratedBook.rating);
    expect(ratedBook.rating).toBe(roundedRating);
  });
});
