import { BaseException } from '../../../../shared/domain/exceptions/baseException';
import { EXCEPTION_CODES } from '../../../../shared/domain/exceptions/exceptionCodes';

export class CardCvvNotValid extends BaseException {

  constructor(cvv: string) {
    const message = `error card cvv value ${cvv} is not valid!(invalid length or digits)`;
    super(EXCEPTION_CODES.CARD_CVV_NOT_VALID, message);
  }

}
