import { EntityManager, getConnection } from 'typeorm';

import { CardEntity } from './typeORM/cardEntity';

import { CardModel } from '../../domain/models/card.model';
import { Card } from '../../domain/valueObjects/card';
import { CardNumber } from '../../domain/valueObjects/cardNumber';
import { CardToken } from '../../domain/valueObjects/cardToken';
import { CardCvv } from '../../domain/valueObjects/cardCvv';
import { CardExpirationMonth } from '../../domain/valueObjects/cardExpirationMonth';
import { CardExpirationYear } from '../../domain/valueObjects/cardExpirationYear';
import { CardEmail } from '../../domain/valueObjects/cardEmail';
import { CardBusiness } from '../../domain/valueObjects/cardBusiness';
import { CardRepository } from '../../domain/repositories/cardRepository';

export class CardRepositoryTypeORM implements CardRepository {

  public async searchOne(token: CardToken): Promise<Card | null> {
    const firstItem = 0;
    const entityManager: EntityManager = getConnection('banking').manager;
    const card = await entityManager.findOne(CardEntity, token.getValue());

    if (!card) {
      return null;
    }

    return this.getCardsByCardsModel(card)[firstItem];
  }


  public async save(card: Card): Promise<void> {
    const entityManager: EntityManager = getConnection('banking').manager;
    await entityManager.save(CardEntity, card.toModel());
  }


  private getCardsByCardsModel(...cardModel: CardModel[]): Card[] {
    return cardModel.map((card: CardModel) => new Card(
      new CardNumber(card.number),
      new CardToken(card.token),
      new CardCvv(card.cvv),
      new CardExpirationMonth(card.expirationMonth),
      new CardExpirationYear(card.expirationYear),
      new CardEmail(card.email),
      new CardBusiness(card.business)
    ));
  }

}
