import { Request, Response } from 'express';
import { CardCreator } from '../../../../boundedContext/banking/cards/application/cardCreator';
import { CardRepositoryTypeORM } from '../../../../boundedContext/banking/cards/infrastructure/persistence/cardRepositoryTypeORM';
import { HTTP_STATUS } from '../../../shared/constants/http_codes';
import { cardDtoFromScalars } from '../../../../boundedContext/banking/cards/domain/utils/util';
import { Card } from '../../../../boundedContext/banking/cards/domain/valueObjects/card';

export class CardCreateController {

  private cardCreator: CardCreator;
  private cardRepositoryImpl: CardRepositoryTypeORM;

  constructor() {
    this.cardRepositoryImpl = new CardRepositoryTypeORM();
    this.cardCreator = new CardCreator(this.cardRepositoryImpl);
  }

  public async run(req: Request, res: Response): Promise<void> {
    const business = req.get('Authorization')!;
    const card = cardDtoFromScalars(req.body.card_number, req.body.cvv, req.body.expiration_month, req.body.expiration_year, req.body.email, business);
    await this.cardCreator.run(card);
    res.status(HTTP_STATUS.CREATED).send(card.toModel());
  }

  public async exec(paramObject: any): Promise<Card> {
    const business = paramObject.business;
    const card = cardDtoFromScalars(paramObject.cardNumber, paramObject.cvv, paramObject.expirationMonth, paramObject.expirationYear, paramObject.email, business);
    await this.cardCreator.run(card);
    return card;
  }

}
