import { Router } from 'express';

import { validateAuthToken } from '../middlewares/tokenAuthenticationMiddlewares.js';
import { validateSchema } from '../middlewares/schemaValidationMiddlewares.js';
import { urlSchema } from '../schemas/urlsSchemas.js';
import { createShortUrl, findOneUrl, useShortUrl } from '../controllers/urlsControllers.js';

const urlsRouter = Router();



urlsRouter.get('/urls/:id', findOneUrl);
urlsRouter.get('/urls/open/:shortUrl', useShortUrl);

urlsRouter.use(validateAuthToken);
urlsRouter.post('/urls/shorten', (req,res,next) => validateSchema(urlSchema,req,res,next), createShortUrl);





export { urlsRouter };