import Joi from '@hapi/joi';


export const addPost = (data) => {
    const schema = Joi.object({
        title: Joi.string()
            .min(6).required(),
        description: Joi.string()
            .min(10)
            .required(),
        thumbnail: Joi.string()
            .required(),
        likes: Joi.number()
            .required()
            .min(0),
        publishDate: Joi.date()
            .required(),
        author: Joi.string()
            .required(),
        categories: Joi.array(),
    });
    return schema.validate(data);
}