import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Card } from '../store/cards.store';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private http = inject(HttpClient);

  loadCards(page: number = 0) {
    return this.http.get<{data: Card[]}>(`https://db.ygoprodeck.com/api/v7/cardinfo.php?num=5&offset=${page * 5}`).pipe(map(response => response.data))
  }

}
