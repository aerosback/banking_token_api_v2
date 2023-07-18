import { CardCreator } from '../../../../../app/boundedContext/banking/cards/application/cardCreator';
import { CardRepositoryInMemory } from '../infraestructure/persistence/cardRepositoryInMemory';
import { cardDtoFromScalars } from '../../../../../app/boundedContext/banking/cards/domain/utils/util';
import { CardAlreadyExists } from '../../../../../app/boundedContext/banking/cards/domain/exceptions/cardAlreadyExists';
import { CardNumberNotValid } from '../../../../../app/boundedContext/banking/cards/domain/exceptions/cardNumberNotValid';
import { CardBusinessNotValid } from '../../../../../app/boundedContext/banking/cards/domain/exceptions/cardBusinessNotValid';
import { CardCvvNotValid } from '../../../../../app/boundedContext/banking/cards/domain/exceptions/cardCvvNotValid';
import { CardEmailNotValid } from '../../../../../app/boundedContext/banking/cards/domain/exceptions/cardEmailNotValid';
import { CardExpirationMonthNotValid } from '../../../../../app/boundedContext/banking/cards/domain/exceptions/cardExpirationMonthNotValid';
import { CardExpirationYearNotValid } from '../../../../../app/boundedContext/banking/cards/domain/exceptions/cardExpirationYearNotValid';

// eslint-disable-next-line max-lines-per-function
describe('Unit test to Card Creator Application service', () => {
  let cardCreator: CardCreator;
  let cardRepositoryInMemory: CardRepositoryInMemory;
  const RealDate = Date.now;

  afterAll(() => {
    global.Date.now = RealDate;
  });

  beforeEach(() => {
    cardRepositoryInMemory = new CardRepositoryInMemory();
    cardCreator = new CardCreator(cardRepositoryInMemory);
    global.Date.now = jest.fn(() => new Date('2019-04-07T10:20:30Z').getTime());
  });

  test('Should create card when not exist in database', async () => {
    const cardNumber = '4417123456789113';
    const cardEmail = 'j.valdez@gmail.com';
    const cardBusiness = 'Bearer Token abcdefg';
    const card = cardDtoFromScalars(cardNumber, '234', '04', '2020', cardEmail, cardBusiness, 'token-abcdefg');

    expect(await cardCreator.run(card));
  });

  test('Should send error when create card that not have valid card number', async () => {
    try {
      const cardNumber = '097401423384552';
      const cardEmail = 'j.valdez@gmail.com';
      const cardBusiness = 'Bearer Token abcdefg';
      const card = cardDtoFromScalars(cardNumber, '234', '04', '2020', cardEmail, cardBusiness, 'token-abcdefg');

      await cardCreator.run(card);
    } catch (error) {
      expect(error).toBeInstanceOf(CardNumberNotValid);
    }
  });

  test('Should send error when create card that not have valid card business', async () => {
    try {
      const cardNumber = '4417123456789113';
      const cardEmail = 'j.valdez@gmail.com';
      const cardBusiness = 'Invalid Card Business 123';
      const card = cardDtoFromScalars(cardNumber, '234', '04', '2020', cardEmail, cardBusiness, 'token-abcdefg');

      await cardCreator.run(card);
    } catch (error) {
      expect(error).toBeInstanceOf(CardBusinessNotValid);
    }
  });

  test('Should send error when create card that not have valid card cvv', async () => {
    try {
      const cardNumber = '4417123456789113';
      const cardEmail = 'j.valdez@gmail.com';
      const cardBusiness = 'Bearer Token abcdefg';
      const card = cardDtoFromScalars(cardNumber, 'abcdef', '04', '2020', cardEmail, cardBusiness, 'token-abcdefg');

      await cardCreator.run(card);
    } catch (error) {
      expect(error).toBeInstanceOf(CardCvvNotValid);
    }
  });

  test('Should send error when create card that not have valid email', async () => {
    try {
      const cardNumber = '4417123456789113';
      const cardEmail = 'j.valdez@msn.com';
      const cardBusiness = 'Bearer Token abcdefg';
      const card = cardDtoFromScalars(cardNumber, '123', '04', '2020', cardEmail, cardBusiness, 'token-abcdefg');

      await cardCreator.run(card);
    } catch (error) {
      expect(error).toBeInstanceOf(CardEmailNotValid);
    }
  });

  test('Should send error when create card that not have valid card expiration month', async () => {
    try {
      const cardNumber = '4417123456789113';
      const cardEmail = 'j.valdez@gmail.com';
      const cardBusiness = 'Bearer Token abcdefg';
      const card = cardDtoFromScalars(cardNumber, '123', '15', '2020', cardEmail, cardBusiness, 'token-abcdefg');

      await cardCreator.run(card);
    } catch (error) {
      expect(error).toBeInstanceOf(CardExpirationMonthNotValid);
    }
  });

  test('Should send error when create card that not have valid card expiration year(year wrong value)', async () => {
    try {
      const cardNumber = '4417123456789113';
      const cardEmail = 'j.valdez@gmail.com';
      const cardBusiness = 'Bearer Token abcdefg';
      const card = cardDtoFromScalars(cardNumber, '123', '11', '25', cardEmail, cardBusiness, 'token-abcdefg');

      await cardCreator.run(card);
    } catch (error) {
      expect(error).toBeInstanceOf(CardExpirationYearNotValid);
    }
  });

  test('Should send error when create card that not have valid card expiration year(year too far away)', async () => {
    try {
      const cardNumber = '4417123456789113';
      const cardEmail = 'j.valdez@gmail.com';
      const cardBusiness = 'Bearer Token abcdefg';
      const card = cardDtoFromScalars(cardNumber, '123', '11', '2035', cardEmail, cardBusiness, 'token-abcdefg');

      await cardCreator.run(card);
    } catch (error) {
      expect(error).toBeInstanceOf(CardExpirationYearNotValid);
    }
  });


  test('Should send error when create card that exist', async () => {
    const cardNumber = '4417123456789113';
    const cardEmail = 'j.valdez@gmail.com';
    const cardBusiness = 'Bearer Token abcdefg';
    const card = cardDtoFromScalars(cardNumber, '234', '04', '2020', cardEmail, cardBusiness, 'token-abcdefg');

    cardRepositoryInMemory.addCards(card);

    try {
      await cardCreator.run(card);
    } catch (error) {
      expect(error).toBeInstanceOf(CardAlreadyExists);
    }
  });
});
