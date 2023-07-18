import { BaseString } from '../../../../shared/domain/valueObjects/baseString';
import { CardEmailNotValid } from '../exceptions/cardEmailNotValid';

export class CardEmail extends BaseString {

  /* eslint-disable */
  constructor(value: string) {
    const regexp = new RegExp('^[a-zA-Z][a-zA-Z0-9_.\-]+@(gmail\.com|hotmail\.com|yahoo\.es)$');
    if (!regexp.test(value)) {
      throw new CardEmailNotValid(value);
    }
    super(value);
  }
  /* eslint-enable */

}
