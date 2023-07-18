import { BaseException } from '../../../../shared/domain/exceptions/baseException';
import { EXCEPTION_CODES } from '../../../../shared/domain/exceptions/exceptionCodes';

export class CardExpirationMonthNotValid extends BaseException {

  constructor(expirationMonth: string) {
    const message = `error card expiration month value ${expirationMonth} is not valid!(it should be 1 or 2 digits in length)`;
    super(EXCEPTION_CODES.CARD_EXPIRATION_MONTH_NOT_VALID, message);
  }

}
