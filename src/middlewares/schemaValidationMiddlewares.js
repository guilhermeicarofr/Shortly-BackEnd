function validateSchema(schema,req,res,next) {

    const data = req.body;

    const validation = schema.validate(data, { abortEarly: false });
    if(validation?.error) {
        console.log(validation.error.details);
        return res.status(422).send(validation.error.details.map((item)=>item.message));
    }

    res.locals.valid = data;
    next();
}

export { validateSchema };