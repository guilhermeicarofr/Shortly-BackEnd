
import { urlSchema } from '../schemas/urlsSchemas.js';

function validateUrl(req,res,next) {

    const url = req.body?.url;

    const validation = urlSchema.validate({ url }, { abortEarly: false });
    if(validation?.error) {
        console.log(validation.error.details);
        return res.status(422).send(validation.error.details.map((item)=>item.message));
    }

    res.locals.url = { url: url };
    next();
}

export { validateUrl };