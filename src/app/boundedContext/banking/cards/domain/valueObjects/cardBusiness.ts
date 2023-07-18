import { BaseString } from '../../../../shared/domain/valueObjects/baseString';
import { CardBusinessNotValid } from '../exceptions/cardBusinessNotValid';

export class CardBusiness extends BaseString {

  constructor(value: string) {
    const regexp = new RegExp('^Bearer Token [a-zA-Z0-9_]+$');
    if (!regexp.test(value)) {
      throw new CardBusinessNotValid(value);
    }
    super(value);
  }

}
