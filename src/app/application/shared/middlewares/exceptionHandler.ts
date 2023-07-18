import { Response } from 'express';
import { HTTP_STATUS } from '../constants/http_codes';
import { BaseException } from '../../../boundedContext/shared/domain/exceptions/baseException';
import { EXCEPTION_CODES } from '../../../boundedContext/shared/domain/exceptions/exceptionCodes';

// eslint-disable-next-line max-lines-per-function
const mapErrorCodeToHTTPCode = (error: BaseException): number | undefined => {
  // eslint-disable-next-line default-case
  switch (error.exceptionCode) {
    case EXCEPTION_CODES.CARD_ALREADY_EXISTS:
      return HTTP_STATUS.CONFLICT;
    case EXCEPTION_CODES.CARD_NOT_FOUND:
      return HTTP_STATUS.NOT_FOUND;
    case EXCEPTION_CODES.CARD_NUMBER_NOT_VALID:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.CARD_CVV_NOT_VALID:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.CARD_EMAIL_NOT_VALID:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.CARD_EXPIRATION_MONTH_NOT_VALID:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.CARD_EXPIRATION_YEAR_NOT_VALID:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.CARD_BUSINESS_NOT_VALID:
      return HTTP_STATUS.BAD_REQUEST;
    case EXCEPTION_CODES.CARD_TOKEN_EXPIRED:
      return HTTP_STATUS.EXPIRED;
    case EXCEPTION_CODES.CARD_TOKEN_RETRIEVED_UNSUCCESFULLY:
      return HTTP_STATUS.BAD_REQUEST;
  }
};


export const exceptionHandler = (error: Error, res: Response): void => {
  if (error instanceof BaseException) {
    const { message } = error as BaseException;

    const httpCode = mapErrorCodeToHTTPCode(error)!;

    res.status(httpCode).json({
      error: message
    });
  } else {
    res.status(HTTP_STATUS.SERVER_ERROR).json({
      error: 'Error not contemplated',
      name: error.name,
      message: error.message,
      stack: error.stack
    });
  }
};
