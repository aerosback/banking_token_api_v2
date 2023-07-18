import { BaseException } from '../../../../shared/domain/exceptions/baseException';
import { EXCEPTION_CODES } from '../../../../shared/domain/exceptions/exceptionCodes';

export class CardExpirationYearNotValid extends BaseException {

  constructor(expirationYear: string) {
    const message = `error card expiration year value${expirationYear} is not valid!(it should be 4 digits in length, around current year +/- 5 years)`;
    super(EXCEPTION_CODES.CARD_EXPIRATION_YEAR_NOT_VALID, message);
  }

}
