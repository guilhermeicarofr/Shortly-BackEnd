import { Router } from 'express';

import { signupUser, signinUser } from '../controllers/usersControllers.js';
import { validateUser, checkUserData } from '../middlewares/usersMiddlewares.js';

const usersRouter = Router();



usersRouter.post('/signup', validateUser, checkUserData, signupUser);
usersRouter.post('/signin', validateUser, checkUserData, signinUser);



export { usersRouter };