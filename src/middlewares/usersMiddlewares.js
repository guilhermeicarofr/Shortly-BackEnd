import bcrypt from 'bcrypt';

import { readUserByEmail } from '../repositories/usersRepositories.js';

async function checkUserData(req,res,next) {
    
    const user = res.locals.valid;

    if(user.confirmPassword && user.confirmPassword !== user.password) {
        console.log('passwords do not match');
        return res.status(422).send('passwords do not match');
    }

    const checkuser = await readUserByEmail(res, user);

    if(req.route.path === '/signup') {
        if(checkuser.rows.length) {
            console.log('you already have an account');
            return res.status(409).send('you already have an account');
        } else {
            res.locals.user = { ...user }
            next();
        }
    }

    if(req.route.path === '/signin') {
        if(checkuser.rows.length) {

            if(!bcrypt.compareSync(user.password, checkuser.rows[0].password)) {
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
}

export { checkUserData };