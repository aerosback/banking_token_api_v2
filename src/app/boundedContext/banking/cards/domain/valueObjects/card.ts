import { AggregateRoot } from '../../../../shared/domain/aggregate/aggregateRoot';
import { CardModel } from '../models/card.model';
import { CardNumber } from './cardNumber';
import { CardToken } from './cardToken';
import { CardCvv } from './cardCvv';
import { CardExpirationMonth } from './cardExpirationMonth';
import { CardExpirationYear } from './cardExpirationYear';
import { CardEmail } from './cardEmail';
import { CardBusiness } from './cardBusiness';

export class Card extends AggregateRoot {

  private number: CardNumber;
  private token: CardToken;
  private cvv: CardCvv;
  private expirationMonth: CardExpirationMonth;
  private expirationYear: CardExpirationYear;
  private email: CardEmail;
  private business: CardBusiness;

  // eslint-disable-next-line max-params
  constructor(
    number: CardNumber,
    token: CardToken,
    cvv: CardCvv,
    expirationMonth: CardExpirationMonth,
    expirationYear: CardExpirationYear,
    email: CardEmail,
    business: CardBusiness
  ) {
    super();
    this.number = number;
    this.token = token;
    this.cvv = cvv;
    this.expirationMonth = expirationMonth;
    this.expirationYear = expirationYear;
    this.email = email;
    this.business = business;
  }

  public getCardNumber(): CardNumber {
    return this.number;
  }

  public getValueCardNumber(): string {
    return this.number.getValue();
  }

  public getCardToken(): CardToken {
    return this.token;
  }

  public getValueCardToken(): string {
    return this.token.getValue();
  }

  public getCardCvv(): CardCvv {
    return this.cvv;
  }

  public getValueCardCvv(): string {
    return this.cvv.getValue();
  }

  public getCardExpirationMonth(): CardExpirationMonth {
    return this.expirationMonth;
  }

  public getValueCardExpirationMonth(): string {
    return this.expirationMonth.getValue();
  }

  public getCardExpirationYear(): CardExpirationYear {
    return this.expirationYear;
  }

  public getValueCardExpirationYear(): string {
    return this.expirationYear.getValue();
  }

  public getCardEmail(): CardEmail {
    return this.email;
  }

  public getValueCardEmail(): string {
    return this.email.getValue();
  }

  public getCardBusiness(): CardBusiness {
    return this.business;
  }

  public getValueCardBusiness(): string {
    return this.business.getValue();
  }

  public toModel(): CardModel {
    return {
      number: this.getValueCardNumber(),
      token: this.getValueCardToken(),
      cvv: this.getValueCardCvv(),
      expirationMonth: this.getValueCardExpirationMonth(),
      expirationYear: this.getValueCardExpirationYear(),
      email: this.getValueCardEmail(),
      business: this.getValueCardBusiness()
    };
  }

  public toSafeModel(): CardModel {
    return {
      number: this.getValueCardNumber(),
      token: '**************',
      cvv: '***',
      expirationMonth: this.getValueCardExpirationMonth(),
      expirationYear: this.getValueCardExpirationYear(),
      email: this.getValueCardEmail(),
      business: '**********'
    };
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public toObject(): Object {
    return {
      number: this.getValueCardNumber(),
      cvv: this.getValueCardCvv(),
      expirationMonth: this.getValueCardExpirationMonth(),
      expirationYear: this.getValueCardExpirationYear(),
      email: this.getValueCardEmail()
    };
  }

}
