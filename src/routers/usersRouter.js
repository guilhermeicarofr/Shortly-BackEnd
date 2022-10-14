import { Router } from 'express';

import { signupUser } from '../controllers/usersControllers.js';
import { validateUser, checkUser } from '../middlewares/usersMiddlewares.js';

const usersRouter = Router();



usersRouter.post('/signup', validateUser, checkUser);
usersRouter.post('/signin', validateUser, checkUser);



export { usersRouter };