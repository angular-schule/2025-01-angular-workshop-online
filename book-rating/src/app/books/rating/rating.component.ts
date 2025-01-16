import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-rating',
  imports: [],
  styles: [],
  template: `
  <span class="badge bg-secondary">
    @for(_ of starsArray(); track $index) {⭐️}
  </span>`,
})
export class RatingComponent {
  value = input.required<number>();
  starsArray = computed(() => new Array(Math.max(this.value(), 0)));
}
