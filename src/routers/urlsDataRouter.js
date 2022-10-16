import { Router } from 'express';

import { validateAuthToken } from '../middlewares/tokenAuthenticationMiddlewares.js';
import { listUserUrls, listUrlsRanking } from '../controllers/urlsDataControllers.js';

const urlsDataRouter = Router();

urlsDataRouter.get('/ranking', listUrlsRanking);

urlsDataRouter.use(validateAuthToken);
urlsDataRouter.get('/users/me', listUserUrls);

export { urlsDataRouter };