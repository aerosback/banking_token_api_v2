import { BaseString } from '../../../../shared/domain/valueObjects/baseString';
import { CardCvvNotValid } from '../exceptions/cardCvvNotValid';

export class CardCvv extends BaseString {

  constructor(value: string) {
    const regexp = new RegExp('^(\\d){3,4}$');
    if (!regexp.test(value)) {
      throw new CardCvvNotValid(value);
    }
    super(value);
  }

}
