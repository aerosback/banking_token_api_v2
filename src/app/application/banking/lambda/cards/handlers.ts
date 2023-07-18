
import { Card } from '../../../../boundedContext/banking/cards/domain/valueObjects/card';
import { CardCreateController } from '../../controllers/cards/cardCreateController';
import { CardSearchOneController } from '../../controllers/cards/cardSearchOneController';

exports.createCardHandler = async (event: any, context: any, callback: any) => {
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

async function createCard(paramObject: Object): Promise<Card>  {
    const cardCreateController: CardCreateController = new CardCreateController();
    const card = await cardCreateController.exec(paramObject);
    return card;
}


exports.searchOneCardHandler = async (event: any, context: any, callback: any) => {
	const token: string = event.token;
    const paramObject = {token};
	const result: Card | null = await searchOneCard(paramObject);

	callback(null, result);
}

async function searchOneCard(paramObject: Object): Promise<Card | null>  {
    const cardSearchOneController: CardSearchOneController = new CardSearchOneController();
    const card = await cardSearchOneController.exec(paramObject);
    return card;
}