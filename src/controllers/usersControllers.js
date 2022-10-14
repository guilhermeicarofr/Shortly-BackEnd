



function signupUser(req,res) {

    //const { name, email, password } = res.locals.user;

    console.log(res.locals.user);


}

function signinUser(req,res) {

    //const { id } = res.locals.user;

    console.log(res.locals.user);



}

export { signupUser, signinUser };