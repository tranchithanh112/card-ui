import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Card } from './models/card.model';
import { CardsService } from './services/cards.service';
import { ChildComponent } from './components/child/child.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'cards';
  cards: Card[] = [];
  card: Card = {
    id: '',
    cardHolderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
  };

  // view child

  message?: string;

  //
  constructor(private cardService: CardsService) {}
  ngOnInit(): void {
    //this.getAllCards();
    this.getAllCardByFetch();
  }
  getAllCards() {
    this.cardService.getAllCards().subscribe((Response) => {
      this.cards = Response;
      this.card = {
        id: '0',
        cardHolderName: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvc: '',
      };
    });
  }
  getAllCardByFetch() {
    this.cardService.getAllCardsByFetch((rs: any) => {
      this.cards = rs;
    });
    console.log(this.cards);
    this.card = {
      id: '0',
      cardHolderName: '',
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvc: '',
    };
  }
  onSubmit() {
    if (this.card.id === '') {
      this.cardService.addCard(this.card).subscribe((res) => {
        this.getAllCards();
      });
    } else {
      this.updateCard(this.card);
    }
  }
  deleteCard(id: string) {
    this.cardService.deleteCard(id).subscribe((res) => this.getAllCards());
  }
  populateForm(card: Card) {
    this.card = card;
  }
  updateCard(card: Card) {
    this.cardService.updateCard(card).subscribe((res) => {
      this.getAllCards();
    });
  }
}
