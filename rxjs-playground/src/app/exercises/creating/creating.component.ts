import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Observer, Subscriber } from 'rxjs';
import { HistoryComponent } from '../../shared/history/history.component';

@Component({
  templateUrl: './creating.component.html',
  imports: [HistoryComponent]
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<unknown>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/


    // of('Hamburg', 'Zürich', 'Wien', 'Leipzig', 'Köln')
    // from([1,2,3,4,5,6])
    // interval(1000)         // ---0---1---2---3---4---5---6 ...
    // timer(3000)            // ---------0|
    // timer(3000, 1000)      // ---------0---1---2---3---4---5---6 ...
    // timer(0, 1000)         // 0---1---2---3---4---5---6 ...

    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    })


    /******************************/

    // Producer: generiert die Daten
    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      const result2 = 5;

      sub.next(result);
      sub.next(result2);
      sub.next(10);

      setTimeout(() => sub.next(100), 1000)
      setTimeout(() => sub.complete(), 3000)
    }

    // Observer: hört von außen zu,
    // konsumiert die Daten
    const obs: Observer<number> = {
      next: (e: number) => console.log(e),
      error: (err: any) => console.error(err),
      complete: () => console.log('FERTIG')
    };

    // producer(obs);

    // Observable: wrappt den Producer
    // Schnittstelle zwischen Producer und Observer
    const myObs$ = new Observable(producer)
    // myObs$.subscribe(obs);

    // $: Finnische Notation

    /*myObs$.subscribe({ next: () => {} });
    myObs$.subscribe({ error: () => {} });
    myObs$.subscribe(() => {});*/




    /******************************/
  }

  log(msg: unknown) {
    this.logStream$.next(msg);
  }

}
