import { BaseString } from '../../../../shared/domain/valueObjects/baseString';
import { CardNumberNotValid } from '../exceptions/cardNumberNotValid';
import { isLuhnValid } from '../utils/util';

export class CardNumber extends BaseString {

  constructor(value: string) {
    const regexp = new RegExp('^(\\d){13,16}$');
    if (!regexp.test(value)) {
      throw new CardNumberNotValid(value);
    }
    if (!isLuhnValid(value)) {
      throw new CardNumberNotValid(value);
    }
    super(value);
  }

}
