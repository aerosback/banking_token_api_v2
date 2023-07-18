import { cardDtoFromScalars } from '../../../../../../app/boundedContext/banking/cards/domain/utils/util';
import { CardNumber } from '../../../../../../app/boundedContext/banking/cards/domain/valueObjects/cardNumber';
import { CardEmail } from '../../../../../../app/boundedContext/banking/cards/domain/valueObjects/cardEmail';
import { CardBusiness } from '../../../../../../app/boundedContext/banking/cards/domain/valueObjects/cardBusiness';
import { CardCvv } from '../../../../../../app/boundedContext/banking/cards/domain/valueObjects/cardCvv';
import { CardExpirationMonth } from '../../../../../../app/boundedContext/banking/cards/domain/valueObjects/cardExpirationMonth';
import { CardExpirationYear } from '../../../../../../app/boundedContext/banking/cards/domain/valueObjects/cardExpirationYear';
import { CardToken } from '../../../../../../app/boundedContext/banking/cards/domain/valueObjects/cardToken';

// eslint-disable-next-line max-lines-per-function
describe('Unit test to Card Updater Application Service', () => {
  const cardNumber = '4417123456789113';
  const cardEmail = 'j.valdez@gmail.com';
  const cardBusiness = 'Bearer Token abcdefg';
  const card = cardDtoFromScalars(cardNumber, '234', '04', '2020', cardEmail, cardBusiness, 'token-abcdefg');
  const RealDate = Date.now;

  afterAll(() => {
    global.Date.now = RealDate;
  });

  beforeEach(() => {
    global.Date.now = jest.fn(() => new Date('2019-04-07T10:20:30Z').getTime());
  });

  test('Should return CardNumber when call method getCardNumber()', async () => {
    const currentCardNumber = new CardNumber('4417123456789113');
    expect(card.getCardNumber()).toBeInstanceOf(CardNumber);
    expect(card.getCardNumber()).toEqual(currentCardNumber);
  });

  test('Should return CardNumber value when call method getValueCardNumber()', async () => {
    expect(card.getValueCardNumber()).toEqual('4417123456789113');
  });

  test('Should return CardEmail when call method getCardEmail()', async () => {
    const currentCardEmail = new CardEmail('j.valdez@gmail.com');
    expect(card.getCardEmail()).toBeInstanceOf(CardEmail);
    expect(card.getCardEmail()).toEqual(currentCardEmail);
  });

  test('Should return CardEmail value when call method getValueCardEmail()', async () => {
    expect(card.getValueCardEmail()).toEqual('j.valdez@gmail.com');
  });

  test('Should return CardBusiness when call method getCardBusiness()', async () => {
    const currentCardBusiness = new CardBusiness('Bearer Token abcdefg');
    expect(card.getCardBusiness()).toBeInstanceOf(CardBusiness);
    expect(card.getCardBusiness()).toEqual(currentCardBusiness);
  });

  test('Should return CardBusiness value when call method getValueCardBusiness()', async () => {
    expect(card.getValueCardBusiness()).toEqual('Bearer Token abcdefg');
  });


  test('Should return CardCvv when call method getCardCvv()', async () => {
    const currentCardCvv = new CardCvv('234');
    expect(card.getCardCvv()).toBeInstanceOf(CardCvv);
    expect(card.getCardCvv()).toEqual(currentCardCvv);
  });

  test('Should return CardCvv value when call method getValueCardCvv()', async () => {
    expect(card.getValueCardCvv()).toEqual('234');
  });


  test('Should return CardExpirationMonth when call method getCardExpirationMonth()', async () => {
    const currentCardExpirationMonth = new CardExpirationMonth('04');
    expect(card.getCardExpirationMonth()).toBeInstanceOf(CardExpirationMonth);
    expect(card.getCardExpirationMonth()).toEqual(currentCardExpirationMonth);
  });

  test('Should return CardExpirationMonth value when call method getValueCardExpirationMonth()', async () => {
    expect(card.getValueCardExpirationMonth()).toEqual('04');
  });


  test('Should return CardExpirationYear when call method getCardExpirationYear()', async () => {
    const currentCardExpirationYear = new CardExpirationYear('2020');
    expect(card.getCardExpirationYear()).toBeInstanceOf(CardExpirationYear);
    expect(card.getCardExpirationYear()).toEqual(currentCardExpirationYear);
  });

  test('Should return CardExpirationYear value when call method getValueCardExpirationYear()', async () => {
    expect(card.getValueCardExpirationYear()).toEqual('2020');
  });


  test('Should return CardToken when call method getCardToken()', async () => {
    const currentCardToken = new CardToken('token-abcdefg');
    expect(card.getCardToken()).toBeInstanceOf(CardToken);
    expect(card.getCardToken()).toEqual(currentCardToken);
  });

  test('Should return CardToken value when call method getValueCardToken()', async () => {
    expect(card.getValueCardToken()).toEqual('token-abcdefg');
  });


  test('Should return card model when call method toModel()', async () => {
    expect(card.toModel()).toEqual({
      number: '4417123456789113',
      token: 'token-abcdefg',
      cvv: '234',
      expirationMonth: '04',
      expirationYear: '2020',
      email: 'j.valdez@gmail.com',
      business: 'Bearer Token abcdefg'
    });
  });
});
