
function createShortUrl (req,res) {

    const { user } = res.locals;
    const { url } = res.locals;

    console.log(user)
    console.log(url)



}




export { createShortUrl };