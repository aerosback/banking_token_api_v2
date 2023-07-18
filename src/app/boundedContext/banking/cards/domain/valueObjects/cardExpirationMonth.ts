import { BaseString } from '../../../../shared/domain/valueObjects/baseString';
import { CardExpirationMonthNotValid } from '../exceptions/cardExpirationMonthNotValid';

export class CardExpirationMonth extends BaseString {

  constructor(value: string) {
    const regexp = new RegExp('^(\\d){1,2}$');
    if (!regexp.test(value)) {
      throw new CardExpirationMonthNotValid(value);
    }
    const MONTH_LOWER_BOUND = 1;
    const MONTH_UPPER_BOUND = 12;
    const parsedMonth = parseInt(value);
    if (parsedMonth < MONTH_LOWER_BOUND || parsedMonth > MONTH_UPPER_BOUND) {
      throw new CardExpirationMonthNotValid(value);
    }
    super(value);
  }

}
