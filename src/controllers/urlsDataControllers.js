import { db } from '../databases/database.js';

async function listUserUrls(req,res) {

    const { user } = res.locals;

    try {
        const userData = await db.query(`select users.id, users.name, count(visits) as "visitCount"
                                    from visits 
                                    join links on visits.link_id=links.id 
                                    join users on links.user_id=users.id
                                    where users.id = $1
                                    group by users.name, users.id
                                   ;`, [user.id]);

        if(!userData.rows[0]) {
            console.log('user not found');
            return res.status(404).send('user not found');
        }

        const userUrls = await db.query(`select links.id as id, links.short_url as "shortUrl", links.full_url as "url", count(visits.link_id) as "visitCount"
                                        from links
                                        left join visits on links.id=visits.link_id
                                        where links.user_id = $1
                                        group by visits.link_id, links.id
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

export { listUserUrls };