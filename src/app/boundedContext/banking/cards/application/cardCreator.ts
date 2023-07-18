import { CardAlreadyExists } from '../domain/exceptions/cardAlreadyExists';
import { Card } from '../domain/valueObjects/card';
import { CardRepository } from '../domain/repositories/cardRepository';

export class CardCreator {

  private cardRepository: CardRepository;

  constructor(cardRepository: CardRepository) {
    this.cardRepository = cardRepository;
  }

  public async run(card: Card): Promise<void> {
    const cardSearched = await this.cardRepository.searchOne(card.getCardToken());

    if (cardSearched) {
      throw new CardAlreadyExists(card);
    }

    await this.cardRepository.save(card);
  }

}
