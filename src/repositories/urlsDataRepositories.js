import { db } from '../databases/database.js';

async function readUserDataVisits(res,user) {
    try {
        return await db.query(`SELECT users.id, users.name, COALESCE(COUNT(visits), 0) AS "visitCount"
                              FROM users
                              LEFT JOIN links ON links.user_id=users.id
                              LEFT JOIN visits ON  visits.link_id=links.id 
                              WHERE users.id = $1
                              GROUP BY users.name, users.id
                              ;`, [user.id]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function readUserUrlsData(res,user) {
    try {
        return await db.query(`SELECT links.id AS id, links.short_url AS "shortUrl", links.full_url AS "url", COUNT(visits.link_id) AS "visitCount"
                              FROM links
                              LEFT JOIN visits ON links.id=visits.link_id
                              WHERE links.user_id = $1
                              GROUP BY visits.link_id, links.short_url, links.id, links.full_url
                              ;`, [ user.id ]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function readUrlsRanking(res) {
    try {
        return await db.query(`SELECT users.id, users.name,
                              COUNT(links) AS "linksCount",
                              COALESCE(("userVisits".count), 0) AS "visitCount"
                              FROM users
                              LEFT JOIN ( SELECT user_id, COUNT(visits) FROM visits
                                          JOIN links ON visits.link_id=links.id
                                          GROUP BY user_id )
                                  AS "userVisits" ON "userVisits".user_id=users.id
                              LEFT JOIN links ON links.user_id=users.id	
                              GROUP BY users.id, users.name, "userVisits".count
                              ORDER BY "visitCount" DESC
                              LIMIT 10
                              ;`);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export { readUserDataVisits, readUserUrlsData, readUrlsRanking };