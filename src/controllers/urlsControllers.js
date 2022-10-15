import { nanoid } from 'nanoid';

import { db } from '../databases/database.js';

async function createShortUrl(req,res) {

    const { user } = res.locals;
    const { url } = res.locals.valid;

    const shortUrl = nanoid();

    try {
        await db.query(`INSERT INTO links (user_id, full_url, short_url)
                        VALUES ($1, $2, $3);`, [ user.id, url, shortUrl ]);
        res.status(201).send({ shortUrl });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function findOneUrl(req,res) {
    
    const id = req.params?.id;

    try {
        const link = await db.query(`SELECT links.id, links.short_url AS "shortUrl", links.full_url AS "url"
                                    FROM links
                                    WHERE links.id=$1
                                    LIMIT 1;`, [ id ]);
        
        if(!link.rows[0]) {
            console.log('link not found');
            res.status(404).send('link not found');
        }

        res.status(200).send(link.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { createShortUrl, findOneUrl };