import { Router } from 'express';

import { validateAuthToken } from '../middlewares/tokenAuthenticationMiddlewares.js';
import { listUserUrls } from '../controllers/urlsDataControllers.js';

const urlsDataRouter = Router();

//urlsRouter.get();

urlsDataRouter.use(validateAuthToken);
urlsDataRouter.get('/users/me', listUserUrls);

export { urlsDataRouter };