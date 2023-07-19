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

  public async run(paramObject: any): Promise<Card> {
    const tokenValue = paramObject.token;
    const token: CardToken = new CardToken(tokenValue);
    const card = await this.cardSearcherOne.run(token);
    return card;
  }

}
