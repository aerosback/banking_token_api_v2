import { BaseException } from '../../../../shared/domain/exceptions/baseException';
import { EXCEPTION_CODES } from '../../../../shared/domain/exceptions/exceptionCodes';
import { CardToken } from '../valueObjects/cardToken';

export class CardNotFound extends BaseException {

  constructor(token: CardToken) {
    const message = `error card with card token ${token.getValue()} does not exist`;
    super(EXCEPTION_CODES.CARD_NOT_FOUND, message);
  }

}
