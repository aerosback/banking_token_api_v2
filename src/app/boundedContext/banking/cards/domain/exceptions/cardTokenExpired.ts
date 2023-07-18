import { BaseException } from '../../../../shared/domain/exceptions/baseException';
import { EXCEPTION_CODES } from '../../../../shared/domain/exceptions/exceptionCodes';
import { CardToken } from '../valueObjects/cardToken';

export class CardTokenExpired extends BaseException {

  constructor(token: CardToken) {
    const message = `error card with card token ${token.getValue()} expired`;
    super(EXCEPTION_CODES.CARD_TOKEN_EXPIRED, message);
  }

}
