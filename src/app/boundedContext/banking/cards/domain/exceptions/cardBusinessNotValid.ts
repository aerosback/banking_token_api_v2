import { BaseException } from '../../../../shared/domain/exceptions/baseException';
import { EXCEPTION_CODES } from '../../../../shared/domain/exceptions/exceptionCodes';

export class CardBusinessNotValid extends BaseException {

  constructor(business: string) {
    const message = `error card business value ${business} is not valid!`;
    super(EXCEPTION_CODES.CARD_BUSINESS_NOT_VALID, message);
  }

}
