import { db } from '../databases/database.js';

async function listUserUrls(req,res) {

    const { user } = res.locals;

    try {
        const userData = await db.query(`SELECT users.id, users.name, COUNT(visits) AS "visitCount"
                                        FROM visits
                                        JOIN links ON visits.link_id=links.id 
                                        JOIN users ON links.user_id=users.id
                                        WHERE users.id = $1
                                        GROUP BY users.name, users.id
                                        ;`, [user.id]);

        if(!userData.rows[0]) {
            console.log('user not found');
            return res.status(404).send('user not found');
        }

        const userUrls = await db.query(`SELECT links.id AS id, links.short_url AS "shortUrl", links.full_url AS "url", COUNT(visits.link_id) AS "visitCount"
                                        FROM links
                                        LEFT JOIN visits ON links.id=visits.link_id
                                        WHERE links.user_id = $1
                                        GROUP BY visits.link_id, links.short_url, links.id, links.full_url
                                        ;`, [user.id]);

        res.status(200).send({
            ...userData.rows[0],
            shortenedUrls: userUrls.rows
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function listUrlsRanking(req,res) {
    
    try {
        const ranking = await db.query(`SELECT users.id, users.name,
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

        res.status(200).send(ranking.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { listUserUrls, listUrlsRanking };