import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { readUserBySession } from '../repositories/usersRepositories.js';

async function validateAuthToken(req,res,next) {
    
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];
    const key = process.env.JWT_SECRET;

    if(!token) {
        console.log('invalid authentication: token not found');
        return res.status(401).send('invalid authentication');
    }

    try {
        const { session_id } = jwt.verify(token, key);
        if(!session_id) {
            console.log('session id not found');
            return res.status(401).send('invalid authentication');
        }

        const userId = await readUserBySession(res, session_id);

        res.locals.user = { ...userId.rows[0] };
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(401);
    }
}

export { validateAuthToken };