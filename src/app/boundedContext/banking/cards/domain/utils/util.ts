import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
import { Card } from '../valueObjects/card';
import { CardNumber } from '../valueObjects/cardNumber';
import { CardToken } from '../valueObjects/cardToken';
import { CardCvv } from '../valueObjects/cardCvv';
import { CardExpirationMonth } from '../valueObjects/cardExpirationMonth';
import { CardExpirationYear } from '../valueObjects/cardExpirationYear';
import { CardEmail } from '../valueObjects/cardEmail';
import { CardBusiness } from '../valueObjects/cardBusiness';

dotenv.config({ path: __dirname + '/../../../../../../../.env' });

// eslint-disable-next-line @typescript-eslint/ban-types
function normalizePayload(payload: Object): Object {
  const validKeys = ['number', 'cvv', 'expirationMonth', 'expirationYear', 'email'];
  let normalizedPayload = new Map();
  Object.keys(payload)
    .sort()
    .forEach((key: string) => {
      if (validKeys.includes(key)) {
        // eslint-disable-next-line @typescript-eslint/ban-types
        normalizedPayload.set(key, payload[key as keyof Object]);
      }
    });

  normalizedPayload = new Map([...normalizedPayload.entries()].sort());

  return Object.fromEntries(normalizedPayload);
}

// eslint-disable-next-line @typescript-eslint/ban-types
function tokenSignIn(payload: Object): string {
  const secret: Secret = process.env.SIGN_IN_SECRET!;
  const expirationSecs: number = parseInt(process.env.SIGN_IN_EXPIRATION_SECS!);
  const normalizedPayload = normalizePayload(payload);
  const SECS_IN_MINUTE = 60;
  const expirationMins = Math.floor(expirationSecs / SECS_IN_MINUTE);
  const token = jwt.sign(
    normalizedPayload,
    secret,
    { expiresIn: `${expirationMins}m` }
  );

  return token;
}

// eslint-disable-next-line max-params
function cardDtoFromScalars(number: string, cvv: string, expirationMonth: string, expirationYear: string, email: string, business: string, token: string | null = null) : Card {
  const payload = { number,
    cvv,
    expirationMonth,
    expirationYear,
    email };
  const currToken = token || tokenSignIn(payload);
  const card = new Card(
    new CardNumber(number),
    new CardToken(currToken),
    new CardCvv(cvv),
    new CardExpirationMonth(expirationMonth),
    new CardExpirationYear(expirationYear),
    new CardEmail(email),
    new CardBusiness(business)
  );

  return card;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function tokenVerify(token: string, payload: Object): [boolean, boolean] {
  const secret: Secret = process.env.SIGN_IN_SECRET!;
  let decodedPayload = {};
  let [isValid, expired] = [true, false];
  const normalizedPayload = normalizePayload(payload);
  try {
    decodedPayload = jwt.verify(token, secret);
    decodedPayload = normalizePayload(decodedPayload);
  } catch (currentError) {
    isValid = false;
    if (currentError instanceof jwt.TokenExpiredError) {
      expired = true;
    }

    return [isValid, expired];
  }
  isValid = JSON.stringify(normalizedPayload) === JSON.stringify(decodedPayload);

  return [isValid, expired];
}

/* eslint-disable */
function checkLuhn(strToTest: string, multiple = 10): number {
  let digit = 0;
  let sum = 0;
  const length: number = strToTest.length;
  let odd = false;

  for (let i: number = length - 1; i >= 0; i--) {
    digit = parseInt(strToTest[i], 10) | 0;
    if (odd === true) {
      digit = digit * 2 | 0;
    }
    if (digit > 9) {
      digit = digit - 9;
    }
    odd = !odd;
    sum += digit;
  }
  const res: number = sum % multiple;
  if (res === 0) {
    return 0;
  }
  return multiple - res;
}

function isLuhnValid(strToTest: string, multiple = 10): boolean {
  if (strToTest.length === 0) {
    return false;
  }
  const ret:boolean = checkLuhn(strToTest, multiple) === 0;

  return ret;
}
/* eslint-enable */


export { cardDtoFromScalars, tokenSignIn, tokenVerify, isLuhnValid };
