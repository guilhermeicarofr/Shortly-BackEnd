
function createShortUrl (req,res) {

    const { user } = res.locals;
    const url = res.locals.valid;

    console.log(user)
    console.log(url)



}




export { createShortUrl };