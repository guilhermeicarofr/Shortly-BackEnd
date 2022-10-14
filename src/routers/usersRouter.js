import { Router } from 'express';

import { signupUser } from '../controllers/usersControllers.js';
import { validateUser } from '../middlewares/usersMiddlewares.js';

const usersRouter = Router();



usersRouter.post('/signup', validateUser);
usersRouter.post('/signin', validateUser);



export { usersRouter };