import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CardStore } from '../../store/cards.store';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-cards',
  imports: [CommonModule],
  templateUrl: './cards.component.html',
})
export class CardsComponent implements OnInit {
  // Injecciones
  readonly store = inject(CardStore);
  
  // Variables Reactivas
  page: WritableSignal<number> = signal(0);

  constructor() {
    effect(() => {
      this.store.loadPages(this.page())
    })
  }

  handleNextPage(): void {
    this.page.update(page => page + 1);
    // this.store.loadPages(this.page());
  }

  // Ciclo de Vida
  ngOnInit(): void {
    this.store.loadPages(0)
  }

}
