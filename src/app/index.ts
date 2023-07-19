import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { HTTP_STATUS } from './application/shared/constants/http_codes';
import { Card } from './boundedContext/banking/cards/domain/valueObjects/card';
import { BaseCard } from './boundedContext/banking/cards/domain/interfaces/baseCard';
import { TokenObject } from './boundedContext/banking/cards/domain/interfaces/tokenObject';
import { toAugmentedCardObject } from './boundedContext/banking/cards/domain/utils/conversions';
import { createCard, searchOneCard } from '../app/application/banking/entrypoints/cards/handlers';
import { exceptionHandler } from './application/shared/middlewares/exceptionHandler';

dotenv.config({ path: __dirname + '/../../.env' });

createConnection('banking');

const port = process.env.NODE_PORT;


const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  switch (request.url) {
    case '/banking/cards': {
      response.setHeader('Content-Type', 'application/json');
      if (request.method === 'POST') {
        getJSONDataFromRequestStream<BaseCard>(request)
          .then(async (post) => {
            try{
              const business = request.headers.authorization!;
              const card: Card = await createCard(toAugmentedCardObject(post, business));
              response.end(JSON.stringify(card.toModel()));
            }
            catch(currentError){
              exceptionHandler(currentError as Error, response);
            }
          })
          .catch((currentError) => {
            response.statusCode = HTTP_STATUS.BAD_REQUEST;
            response.end(JSON.stringify({error: currentError.toString()}));
          });
      }
      break;
    }
    case '/banking/card': {
      response.setHeader('Content-Type', 'application/json');
      if (request.method === 'POST') {
        getJSONDataFromRequestStream<TokenObject>(request)
          .then(async (tokenObject) => {
            try{
              const token = tokenObject.token;
              const card: Card = await searchOneCard({token});
              response.end(JSON.stringify(card.toSafeModel()));
            }
            catch(currentError){
              exceptionHandler(currentError as Error, response);
            }           
          })
          .catch((currentError) => {
            response.statusCode = HTTP_STATUS.BAD_REQUEST;
            response.end(JSON.stringify({error: currentError.toString()}));
          });
      }
      break;
    }
    default: {
      response.statusCode = HTTP_STATUS.NOT_FOUND;
      response.end();
    }
  }
});
 
function getJSONDataFromRequestStream<T>(request: IncomingMessage): Promise<T> {
  return new Promise(resolve => {
    const chunks : any[] = [];
    request.on('data', (chunk) => {
      chunks.push(chunk);
    });
    request.on('end', () => {
      resolve(
        JSON.parse(
          Buffer.concat(chunks).toString()
        )
      )
    });
  })
}

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default server;
