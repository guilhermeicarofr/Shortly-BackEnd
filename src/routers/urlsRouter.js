import { Router } from 'express';

import { validateAuthToken } from '../middlewares/tokenAuthenticationMiddlewares.js';
import { validateSchema } from '../middlewares/schemaValidationMiddlewares.js';
import { urlSchema } from '../schemas/urlsSchemas.js';
import { createShortUrl, findOneUrl, useShortUrl, deleteOneUrl } from '../controllers/urlsControllers.js';

const urlsRouter = Router();

urlsRouter.get('/urls/:id', findOneUrl);
urlsRouter.get('/urls/open/:shortUrl', useShortUrl);

urlsRouter.post('/urls/shorten', validateAuthToken, (req,res,next) => validateSchema(urlSchema,req,res,next), createShortUrl);
urlsRouter.delete('/urls/:id', validateAuthToken, deleteOneUrl);

export { urlsRouter };