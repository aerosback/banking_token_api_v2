import { BaseException } from '../../../../shared/domain/exceptions/baseException';
import { EXCEPTION_CODES } from '../../../../shared/domain/exceptions/exceptionCodes';
import { Card } from '../valueObjects/card';

export class CardAlreadyExists extends BaseException {

  constructor(card: Card) {
    const message = `error card with card number ${card.getValueCardNumber()} already exists`;
    super(EXCEPTION_CODES.CARD_ALREADY_EXISTS, message);
  }

}
