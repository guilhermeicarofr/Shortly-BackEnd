import { Router } from 'express';

import { validateAuthToken } from '../middlewares/tokenAuthenticationMiddlewares.js';
import { validateSchema } from '../middlewares/schemaValidationMiddleware.js';
import { urlSchema } from '../schemas/urlsSchemas.js';
import { createShortUrl } from '../controllers/urlsControllers.js';

const urlsRouter = Router();

urlsRouter.use(validateAuthToken);
urlsRouter.post('/urls/shorten', (req,res,next) => validateSchema(urlSchema,req,res,next), createShortUrl);





export { urlsRouter };