import { BaseCard } from '../../../../../boundedContext/banking/cards/domain/interfaces/baseCard';

export function toAugmentedCardObject(card: BaseCard, business: string): Object {
    return {
        cardNumber: card.card_number,
        cvv: card.cvv,
        expirationMonth: card.expiration_month,
        expirationYear: card.expiration_year,
        email: card.email,
        business: business
    };
}