import { BaseException } from '../../../../shared/domain/exceptions/baseException';
import { EXCEPTION_CODES } from '../../../../shared/domain/exceptions/exceptionCodes';

export class CardEmailNotValid extends BaseException {

  constructor(email: string) {
    const message = `error card email ${email} is not valid!(it should end with @gmail.com, @hotmail.com or @yahoo.es)`;
    super(EXCEPTION_CODES.CARD_EMAIL_NOT_VALID, message);
  }

}
