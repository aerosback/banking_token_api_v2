import { BaseException } from '../../../../shared/domain/exceptions/baseException';
import { EXCEPTION_CODES } from '../../../../shared/domain/exceptions/exceptionCodes';

export class CardNumberNotValid extends BaseException {

  constructor(number: string) {
    const message = `error card number ${number} is not a valid card number`;
    super(EXCEPTION_CODES.CARD_NUMBER_NOT_VALID, message);
  }

}
