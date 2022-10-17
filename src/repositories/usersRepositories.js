import { db } from '../databases/database.js';

async function readUserByEmail(res,user) {
    try {
        return await db.query('SELECT * FROM users WHERE email=$1 LIMIT 1', [ user.email ]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function readUserBySession(res,sessionId) {
    try {
        return await db.query(`SELECT users.id
                        FROM users
                        JOIN sessions on users.id=sessions.user_id
                        WHERE sessions.id=$1
                        LIMIT 1;`, [ sessionId ]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function createNewUser(res,name,email,encryptedPassword) {
    try {
        await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3);', [ name, email, encryptedPassword ]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function createNewUserSession(res,id) {
    try {
        return await db.query('INSERT INTO sessions (user_id) VALUES ($1) RETURNING sessions.id;', [ id ]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export { readUserByEmail, readUserBySession, createNewUser, createNewUserSession };