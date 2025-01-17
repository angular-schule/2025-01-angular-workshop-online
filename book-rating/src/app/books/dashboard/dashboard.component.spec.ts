import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { BookRatingService } from '../shared/book-rating.service';
import { Book } from '../shared/book';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    const ratingMock = {
      rateUp: (b: Book) => b,
      // rateDown: (b: Book) => b,
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: BookRatingService, useValue: ratingMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    // TS-Klasseninstanz
    component = fixture.componentInstance;

    // Zugriff auf DOM-Element
    // fixture.nativeElement.querySelector('p')

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp() for doRateUp()', () => {
    // ARRANGE
    // Service injecten, das ist in Wahrheit aber unser ratingMock
    const rs = TestBed.inject(BookRatingService);

    // Testbuch
    const testBook = { isbn: '345534543' } as Book; // Type Assertion

    // Methode präparieren
    // spyOn(rs, 'rateUp').and.returnValue(testBook);
    // spyOn(rs, 'rateUp').and.callFake(b => b)
    // spyOn(rs, 'rateUp').and.callFake(() => testBook)
    // Methode überwachen, aber originale Methode nicht wegwerfen,
    // sondern weiterhin verwenden, um den Retun-Wert zu erzeugen
    spyOn(rs, 'rateUp').and.callThrough();

    // ACT
    // Methode in Komp aufrufen
    component.doRateUp(testBook);

    // ASSERT
    // prüfen, ob Methode aufgerufen wurde
    expect(rs.rateUp).toHaveBeenCalled();
    expect(rs.rateUp).toHaveBeenCalledOnceWith(testBook);
  });
});
