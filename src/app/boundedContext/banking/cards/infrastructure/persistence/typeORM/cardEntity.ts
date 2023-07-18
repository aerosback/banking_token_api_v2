import { EntitySchema } from 'typeorm';
import { CardModel } from '../../../domain/models/card.model';

export const CardEntity = new EntitySchema<CardModel>({
  name: 'cards',
  columns: {
    token: {
      primary: true,
      type: String,
      generated: undefined
    },
    number: {
      type: String
    },
    cvv: {
      type: String
    },
    expirationMonth: {
      type: String
    },
    expirationYear: {
      type: String
    },
    email: {
      type: String
    },
    business: {
      type: String
    }
  }
});
