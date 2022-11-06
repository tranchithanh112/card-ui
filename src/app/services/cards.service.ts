import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  baseUrl = 'https://localhost:7090/api/cards';
  cardsResult: Card[] = [];
  constructor(private http: HttpClient) {}
  //Get all cards
  getAllCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.baseUrl);
  }
  getAllCardsByFetch(callback: any) {
    fetch(this.baseUrl)
      .then((r) => r.json())
      .then(callback);
  }
  addCard(card: Card): Observable<Card> {
    console.log(card);
    card.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Card>(this.baseUrl, card);
  }
  deleteCard(id: string): Observable<Card> {
    return this.http.delete<Card>(this.baseUrl + '/' + id);
  }
  updateCard(card: Card) {
    return this.http.put(this.baseUrl + '/' + card.id, card);
  }
  observable = new Observable(function subcribe(observer) {
    const id = setTimeout(() => {
      observer.next('Hello rxjs');
      observer.complete();
    }, 1000);
    return function unsubcribe() {
      clearTimeout(id);
    };
  });
}
