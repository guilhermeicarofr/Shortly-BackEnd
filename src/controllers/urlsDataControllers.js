import { readUserDataVisits, readUserUrlsData, readUrlsRanking } from '../repositories/urlsDataRepositories.js';

async function listUserUrls(req,res) {

    const { user } = res.locals;

    const userData = await readUserDataVisits(res, user);

    if(!userData.rows[0]) {
        console.log('user not found');
        return res.status(404).send('user not found');
    }

    const userUrls = await readUserUrlsData(res, user);

    res.status(200).send({
        ...userData.rows[0],
        shortenedUrls: userUrls.rows
    });
}

async function listUrlsRanking(req,res) {

    const ranking = await readUrlsRanking(res);

    res.status(200).send(ranking.rows);
}

export { listUserUrls, listUrlsRanking };