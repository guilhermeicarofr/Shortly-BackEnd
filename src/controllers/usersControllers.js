import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { createNewUser, createNewUserSession } from '../repositories/usersRepositories.js';

function signupUser(req,res) {

    const { name, email, password } = res.locals?.user;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    createNewUser(res, name, email, encryptedPassword);

    res.sendStatus(201);
}

async function signinUser(req,res) {

    const { id } = res.locals.user;
    const key = process.env.JWT_SECRET;

    const session = await createNewUserSession(res, id);
    
    const token = jwt.sign({ session_id: session.rows[0].id }, key, { expiresIn: 60*60*24 });
    res.status(200).send({ token: token });
}

export { signupUser, signinUser };