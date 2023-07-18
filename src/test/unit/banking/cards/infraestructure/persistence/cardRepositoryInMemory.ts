import { Card } from '../../../../../../app/boundedContext/banking/cards/domain/valueObjects/card';
import { CardToken } from '../../../../../../app/boundedContext/banking/cards/domain/valueObjects/cardToken';
import { CardRepository } from '../../../../../../app/boundedContext/banking/cards/domain/repositories/cardRepository';

interface CardIndexed {
  [token: string]: Card
}

export class CardRepositoryInMemory implements CardRepository {

  private cards: Card[] = [];
  private cardsIndexed: CardIndexed = {}

  async searchOne(token: CardToken): Promise<Card | null> {
    return await new Promise((resolve) => {
      const card: Card = this.cardsIndexed[token.getValue()];
      if (!card) {
        resolve(null);
      }

      resolve(card);
    });
  }

  save(card: Card): Promise<void> {
    return new Promise((resolve) => {
      this.addCardInMemory(card);
      resolve();
    });
  }


  public addCards(...cards: Card[]): void {
    cards.map(card => this.addCardInMemory(card));
  }

  private addCardInMemory(card: Card): void {
    this.cards.push(card);
    this.cardsIndexed[card.getValueCardToken()] = card;
  }

}
