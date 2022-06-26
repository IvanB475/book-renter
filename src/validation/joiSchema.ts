import * as Joi from 'joi';


export const schema = {
    signUp: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
    }),
    login: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
    }),
    addBook: Joi.object().keys({
        name: Joi.string().required(),
        author: Joi.string(),
        description: Joi.string(),
        totalAmountAvailable: Joi.number().min(1),
        currentlyRented: Joi.number().min(0),
        image: Joi.string()
    }),
    editBook: Joi.object().keys({
        description: Joi.string(),
        totalAmountAvailable: Joi.number().min(1),
        currentlyRented: Joi.number().min(0),
        image: Joi.string()
    }),

}