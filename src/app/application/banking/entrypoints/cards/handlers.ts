
import { Card } from '../../../../boundedContext/banking/cards/domain/valueObjects/card';
import { CardCreateController } from '../../controllers/cards/cardCreateController';
import { CardSearchOneController } from '../../controllers/cards/cardSearchOneController';

export async function createCardHandler(event: any, context: any, callback: any): Promise<void> {
	const cardNumber: string = event.cardNumber;
    const cvv: string = event.cvv;
    const expirationMonth: string = event.expirationMonth;
    const expirationYear: string = event.expirationYear;
    const email: string = event.email;
    const business: string = event.business;
    const paramObject = {cardNumber, cvv, expirationMonth, expirationYear, email, business};
	const result: Card = await createCard(paramObject);

	callback(null, result);
}

export async function createCard(paramObject: Object): Promise<Card>  {
    const cardCreateController: CardCreateController = new CardCreateController();
    const card = await cardCreateController.run(paramObject);
    return card;
}


export async function searchOneCardHandler(event: any, context: any, callback: any): Promise<void> {
	const token: string = event.token;
    const paramObject = {token};
	const result: Card | null = await searchOneCard(paramObject);

	callback(null, result);
}

export async function searchOneCard(paramObject: Object): Promise<Card>  {
    const cardSearchOneController: CardSearchOneController = new CardSearchOneController();
    const card = await cardSearchOneController.run(paramObject);
    return card;
}

