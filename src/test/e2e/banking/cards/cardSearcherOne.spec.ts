import supertest from 'supertest';
import app from '../../../../app';
import { HTTP_STATUS } from '../../../../app/application/shared/constants/http_codes';
import { tokenSignIn } from '../../../../app/boundedContext/banking/cards/domain/utils/util';

/* eslint-disable */
describe('Unit test to Card Searcher One Application service', () => {
  const RealDate = Date.now;
  const tokenData = {
    card_number: "4417123456789113",
    cvv: "120",
    expiration_month: "10",
    expiration_year: "2020",
    email: "demo244@gmail.com",
  };

  const payload = {
    number: tokenData.card_number,
    cvv: tokenData.cvv,
    expirationMonth: tokenData.expiration_month,
    expirationYear: tokenData.expiration_year,
    email: tokenData.email
  };

  afterAll(() => {
    global.Date.now = RealDate;
  });

  beforeEach(() => {
    global.Date.now = jest.fn(() => new Date('2019-04-07T10:20:30Z').getTime());
  });

  test('Should create card when not exist in database and then retrieve it', async () => {

    const token = tokenSignIn(payload);
    const expectedOutput = {
      number: "4417123456789113",
      token: token,
      cvv: "120",
      expirationMonth: "10",
      expirationYear: "2020",
      email: "demo244@gmail.com",
      business: "Bearer Token abc123"
    };
    const expectedOtherOutput = {
      number: "4417123456789113",
      token: "**************",
      cvv: "***",
      expirationMonth: "10",
      expirationYear: "2020",
      email: "demo244@gmail.com",
      business: "Bearer Token abc123"
    };
    
    supertest(app)
      .post('/banking/cards')
      .set('Authorization', 'Bearer Token abc123')
      .send(tokenData)
      .expect(HTTP_STATUS.CREATED)
      .then((response) => {
          expect(response.body.token).toBe(token);
          expect(response.body).toEqual(expectedOutput);
    });

    supertest(app)
      .post('/banking/card')
      .send({token: token})
      .expect(HTTP_STATUS.SUCCESS)
      .then((response) => {
          expect(response.body).toEqual(expectedOtherOutput);
    });

  });
});
/* eslint-enable */
