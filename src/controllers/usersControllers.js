import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { db } from '../databases/database.js';

async function signupUser(req,res) {

    const { name, email, password } = res.locals?.user;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    try {        
        await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3);', [ name, email, encryptedPassword ]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function signinUser(req,res) {

    const { id } = res.locals.user;
    const key = process.env.JWT_SECRET;
    
    try {        
        const session = await db.query('INSERT INTO sessions (user_id) VALUES ($1) RETURNING sessions.id;', [ id ]);
        
        const token = jwt.sign({ session_id: session.rows[0].id }, key, { expiresIn: 60*60*24 });
        res.status(200).send(token);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { signupUser, signinUser };