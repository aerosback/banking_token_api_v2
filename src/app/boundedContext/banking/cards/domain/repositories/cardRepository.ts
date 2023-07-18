import { Card } from '../valueObjects/card';
import { CardToken } from '../valueObjects/cardToken';

export interface CardRepository {

    searchOne(token: CardToken): Promise<Card | null>;
    save(card: Card): Promise<void>;

}
