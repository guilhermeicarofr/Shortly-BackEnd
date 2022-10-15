import { nanoid } from 'nanoid';

import { db } from '../databases/database.js';

async function createShortUrl (req,res) {

    const { user } = res.locals;
    const url = res.locals.valid;

    const shortUrl = nanoid();

    try {
        await db.query('INSERT INTO links (user_id, full_url, short_url) VALUES ($1, $2, $3);', [ user.id, url, shortUrl ]);
        res.status(201).send({ shortUrl });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { createShortUrl };