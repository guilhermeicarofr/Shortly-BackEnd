import { Router } from 'express';

import { usersRouter } from './usersRouter.js';
import { validateAuthToken } from '../middlewares/tokenAuthenticationMiddlewares.js';
import { validateUrl } from '../middlewares/urlsMiddlewares.js'
import { createShortUrl } from '../controllers/urlsControllers.js';

const urlsRouter = Router();

urlsRouter.use(validateAuthToken);
urlsRouter.post('/urls/shorten', validateUrl, createShortUrl);


export { urlsRouter };