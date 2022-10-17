import { db } from '../databases/database.js';

async function createNewUrl(res,user,url,shortUrl) {
    try {
        await db.query(`INSERT INTO links (user_id, full_url, short_url)
                             VALUES ($1, $2, $3);`, [ user.id, url, shortUrl ]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function deleteUrlById(res,id) {
    try {
        await db.query('DELETE FROM links WHERE links.id=$1;', [ id ]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function readUrlById(res,id) {
    try {
        return await db.query(`SELECT links.id, links.short_url AS "shortUrl", links.full_url AS "url", links.user_id AS "userId"
                             FROM links
                             WHERE links.id=$1
                             LIMIT 1;`, [ id ]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function readUrlByShort(res,shortUrl) {
    try {
        return await db.query(`SELECT links.id, links.full_url AS "url"
                              FROM links
                              WHERE links.short_url=$1
                              LIMIT 1;`, [ shortUrl ]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function createNewUrlVisit(res,id) {
    try {
        await db.query('INSERT INTO visits (link_id) VALUES ($1);', [ id ]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function deleteUrlVisits(res,id) {
    try {
        await db.query('DELETE FROM visits WHERE visits.link_id=$1;', [ id ]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { createNewUrl, deleteUrlById, readUrlById, readUrlByShort, createNewUrlVisit, deleteUrlVisits };