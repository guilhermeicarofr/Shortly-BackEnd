import { nanoid } from 'nanoid';

import { createNewUrl, deleteUrlById, readUrlById, readUrlByShort, createNewUrlVisit, deleteUrlVisits } from '../repositories/urlsRepositories.js';

async function createShortUrl(req,res) {

    const { user } = res.locals;
    const { url } = res.locals.valid;
    const shortUrl = nanoid(8);

    await createNewUrl(res, user, url, shortUrl);

    res.status(201).send({ shortUrl });
}

async function findOneUrl(req,res) {

    const id = req.params?.id;
    if(isNaN(id)) {
        console.log('link not found');
        return res.status(404).send('link not found');
    }

    const link =  await readUrlById(res, id);

    if(!link?.rows[0]) {
        console.log('link not found');
        return res.status(404).send('link not found');
    }

    delete link?.rows[0].userId;
    res.status(200).send(link.rows[0]);
}

async function useShortUrl(req,res) {

    const shortUrl = req.params?.shortUrl;

    const link = await readUrlByShort(res, shortUrl);

    if(!shortUrl || !link?.rows.length) {
        console.log('link not found');
        res.status(404).send('link not found');
    }

    await createNewUrlVisit(res, link.rows[0].id);

    res.redirect(link.rows[0].url);
}

async function deleteOneUrl(req,res) {

    const { user } = res.locals;
    const id = req.params?.id;

    const link = await readUrlById(res, id);

    if(!link.rows[0]) {
        console.log('link not found');
        return res.status(404).send('link not found');
    } else if (link.rows[0].userId !== user.id) {
        console.log('authentication does not match link owner');
        return res.status(401).send('unauthorized');
    }

    await deleteUrlVisits(res, id);
    await deleteUrlById(res, id);

    res.sendStatus(204);
}

export { createShortUrl, findOneUrl, useShortUrl, deleteOneUrl };