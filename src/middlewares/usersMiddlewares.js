import bcrypt from 'bcrypt';

import { signupSchema, signinSchema } from '../schemas/usersSchemas.js';
import { db } from '../databases/database.js';

function validateUser(req,res,next) {
    
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

    if(user.confirmPassword && user.confirmPassword !== user.password) {
        console.log('passwords do not match');
        return res.status(422).send('passwords do not match');
    }

    res.locals.user = {
        ...user
    };
    next();
}

 async function checkUserData(req,res,next) {
    
    const { email, password } = res.locals.user;

    try {
        const checkuser = await db.query('SELECT * FROM users WHERE email=$1 LIMIT 1', [ email ]);

        if(req.route.path === '/signup') {
            if(checkuser.rows.length) {
                console.log('you already have an account');
                return res.status(409).send('you already have an account');
            } else {
                next();
            }
        }

        if(req.route.path === '/signin') {
            if(checkuser.rows.length) {

                if(!bcrypt.compareSync(password, checkuser.rows[0].password)) {
                    console.log('password invalid');
                    return res.status(401).send('invalid email or password');
                
                } else {
                    res.locals.user = { id:checkuser.rows[0].id };
                    next();
                }

            } else {
                console.log('user email not found');
                return res.status(401).send('invalid email or password');
            }
        }

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { validateUser, checkUserData };