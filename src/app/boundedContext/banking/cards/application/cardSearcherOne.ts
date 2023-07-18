import { Card } from '../domain/valueObjects/card';
import { CardToken } from '../domain/valueObjects/cardToken';
import { CardRepository } from '../domain/repositories/cardRepository';
import { tokenVerify } from '../../../../boundedContext/banking/cards/domain/utils/util';
import { CardNotFound } from '../domain/exceptions/cardNotFound';
import { CardTokenExpired } from '../domain/exceptions/cardTokenExpired';
import { CardTokenRetrievalError } from '../domain/exceptions/cardTokenRetrievalError';

export class CardSearcherOne {

  private cardRepository: CardRepository;

  constructor(cardRepository: CardRepository) {
    this.cardRepository = cardRepository;
  }

  public async run(token: CardToken): Promise<Card> {
    const cardSearched = await this.cardRepository.searchOne(token);

    if (!cardSearched) {
      throw new CardNotFound(token);
    }

    const [isValid, expired] = tokenVerify(token.getValue(), cardSearched.toObject());
    if (expired) {
      throw new CardTokenExpired(token);
    } else if (!isValid) {
      throw new CardTokenRetrievalError(token);
    }

    return cardSearched;
  }

}
