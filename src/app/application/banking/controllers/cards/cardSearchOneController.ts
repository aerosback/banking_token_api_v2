import { Request, Response } from 'express';
import { CardSearcherOne } from '../../../../boundedContext/banking/cards/application/cardSearcherOne';
import { CardToken } from '../../../../boundedContext/banking/cards/domain/valueObjects/cardToken';
import { CardRepositoryTypeORM } from '../../../../boundedContext/banking/cards/infrastructure/persistence/cardRepositoryTypeORM';
import { HTTP_STATUS } from '../../../shared/constants/http_codes';
import { Card } from '../../../../boundedContext/banking/cards/domain/valueObjects/card';

export class CardSearchOneController {

  private cardSearcherOne: CardSearcherOne;
  private cardRepositoryImpl: CardRepositoryTypeORM;

  constructor() {
    this.cardRepositoryImpl = new CardRepositoryTypeORM();
    this.cardSearcherOne = new CardSearcherOne(this.cardRepositoryImpl);
  }

  public async run(req: Request, res: Response): Promise<void> {
    const tokenValue = req.body.token;
    const token: CardToken = new CardToken(tokenValue);
    const card = await this.cardSearcherOne.run(token);
    res.status(HTTP_STATUS.SUCCESS).send(card.toSafeModel());
  }

  public async exec(paramObject: any): Promise<Card | null> {
    const tokenValue = paramObject.token;
    const token: CardToken = new CardToken(tokenValue);
    const card = await this.cardSearcherOne.run(token);
    return card;
  }

}
