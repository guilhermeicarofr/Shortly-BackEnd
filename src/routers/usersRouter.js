import { Router } from 'express';

import { validateSchema } from '../middlewares/schemaValidationMiddlewares.js';
import { signupSchema, signinSchema } from '../schemas/usersSchemas.js';
import { checkUserData } from '../middlewares/usersMiddlewares.js';
import { signupUser, signinUser } from '../controllers/usersControllers.js';

const usersRouter = Router();

usersRouter.post('/signup', (req,res,next) => validateSchema(signupSchema,req,res,next), checkUserData, signupUser);
usersRouter.post('/signin', (req,res,next) => validateSchema(signinSchema,req,res,next), checkUserData, signinUser);

export { usersRouter };