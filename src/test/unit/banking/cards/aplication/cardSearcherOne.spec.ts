import { CardSearcherOne } from '../../../../../app/boundedContext/banking/cards/application/cardSearcherOne';
import { CardNotFound } from '../../../../../app/boundedContext/banking/cards/domain/exceptions/cardNotFound';
import { CardTokenExpired } from '../../../../../app/boundedContext/banking/cards/domain/exceptions/cardTokenExpired';
import { CardToken } from '../../../../../app/boundedContext/banking/cards/domain/valueObjects/cardToken';
import { CardRepositoryInMemory } from '../infraestructure/persistence/cardRepositoryInMemory';
import { cardDtoFromScalars } from '../../../../../app/boundedContext/banking/cards/domain/utils/util';


// eslint-disable-next-line max-lines-per-function
describe('Unit test to Card Searcher One Application Service', () => {
  let cardSearcherOne: CardSearcherOne;
  let cardRepositoryInMemory: CardRepositoryInMemory;
  const RealDate = Date.now;

  afterAll(() => {
    global.Date.now = RealDate;
  });

  beforeEach(() => {
    cardRepositoryInMemory = new CardRepositoryInMemory();
    cardSearcherOne = new CardSearcherOne(cardRepositoryInMemory);
    global.Date.now = jest.fn(() => new Date('2019-04-07T10:20:30Z').getTime());
  });

  test('Should get card when exists', async () => {
    const cardNumber = '4417123456789113';
    const cardEmail = 'j.valdez@gmail.com';
    const cardBusiness = 'Bearer Token abcdefg';
    const card = cardDtoFromScalars(cardNumber, '234', '04', '2020', cardEmail, cardBusiness);

    cardRepositoryInMemory.addCards(card);

    const cardSearched = await cardSearcherOne.run(card.getCardToken());

    expect(card).toEqual(cardSearched);
  });

  test('Should send error when search card that not exists', async () => {
    const cardToken = new CardToken('token-not-persisted');
    try {
      await cardSearcherOne.run(cardToken);
    } catch (error) {
      expect(error).toBeInstanceOf(CardNotFound);
    }
  });

  test('Should send error when search card whose token expired', async () => {
    const cardNumber = '4417123456789113';
    const cardEmail = 'j.valdez@gmail.com';
    const cardBusiness = 'Bearer Token abcdefg';
    const card = cardDtoFromScalars(cardNumber, '234', '04', '2020', cardEmail, cardBusiness);

    cardRepositoryInMemory.addCards(card);

    global.Date.now = jest.fn(() => new Date('2019-04-07T12:20:30Z').getTime());

    try {
      await cardSearcherOne.run(card.getCardToken());
    } catch (error) {
      expect(error).toBeInstanceOf(CardTokenExpired);
    }
  });
});
