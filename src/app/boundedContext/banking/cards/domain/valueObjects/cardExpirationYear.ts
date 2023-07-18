import { BaseString } from '../../../../shared/domain/valueObjects/baseString';
import { CardExpirationYearNotValid } from '../exceptions/cardExpirationYearNotValid';

export class CardExpirationYear extends BaseString {

  constructor(value: string) {
    const regexp = new RegExp('^(\\d){4}$');
    if (!regexp.test(value)) {
      throw new CardExpirationYearNotValid(value);
    }
    const parsedYear = parseInt(value);
    const currentYear = new Date().getFullYear();
    const YEARS_SPAN = 5;
    if (parsedYear > currentYear + YEARS_SPAN || parsedYear < currentYear - YEARS_SPAN) {
      throw new CardExpirationYearNotValid(value);
    }
    super(value);
  }

}
