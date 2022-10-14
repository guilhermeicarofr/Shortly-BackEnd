
import { signupSchema, signinSchema } from '../schemas/usersShchemas.js';

function validateUser(req,res, next) {
    
    const user = req.body;

    let validation = {};
    if(req.route.path === '/signup') {
        validation = signupSchema.validate(user, { abortEarly: false });
    } else if (req.route.path === '/signin') {
        validation = signinSchema.validate(user, { abortEarly: false });
    }
    if(validation?.error) {
        console.log(validation.error.details);
        return res.status(422).send(validation.error.details.map((item)=>item.message));
    }

    res.locals.user = {
        ...user
    };
    next();
}

export { validateUser };