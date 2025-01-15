import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


////////////

export class Customer {
  // private (JavaScript)
  #id: number;

  // private (TypeScript)
  private name: string;

  // static – eher nicht verwenden
  static Foo = 5;

  // optionales Property
  foo?: number;

  constructor(id: number, name: string) {
    this.#id = id;
    this.name = name;

    this.foo = 5;
    this.foo = undefined;
  }

  xyz(foo: string): void {
    /*setTimeout(function () {
      console.log('ID', this.#id);
    }, 2000)*/

    // Arrow function hat keinen eigenen this-Kontext
    setTimeout(() => {
      console.log('ID', this.#id);
    }, 2000)
  }
}

// Vererbung
class SuperMarketCustomer extends Customer {
  constructor(id: number, name: string, supermakrte: string) {
    super(id, name);
  }
}

// Union Types
export type Foo = string | Customer | undefined;

const xxx: Foo = new Customer(2, '');
const yyy: Foo = '';


// Named Function
function ddd0(param: number) {
  return param + 1;
}

// Anonymous Function
const ddd1 = function (param: number) {
  return param + 1;
}

// Arrow Function (Anonymous)
const ddd2 = (param: number) => param + 1;


const eee = ddd1(4);


export function getArrayLength(arr: unknown[]) {
  return arr.length;
}

export function logger(message: string | number): void {
  console.log(message);
}



