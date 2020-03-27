const { Segments, Joi } = require('celebrate');

module.exports = {
      create: {
            [Segments.BODY]: Joi.object().keys({
                  TITLE: Joi.string().required().error(new Error('Title is a required field!')),
                  DESCRIPTION: Joi.string().required().error(new Error('Description is a required field!')),
                  VALUE: Joi.number().required().error(new Error('Invalid value!')),
            }),
            [Segments.HEADERS]: Joi.object({
                  authorization: Joi.string().required().token().min(4).error(new Error('Authorization Header is required!')),
            }).unknown(),
      },
      delete: {
            [Segments.HEADERS]: Joi.object({
                  authorization: Joi.string().required().token().min(4).error(new Error('Authorization Header is required!')),
            }).unknown(),
            [Segments.QUERY]: {
                  ID: Joi.number().error(new Error('Invalid ID!')),
            }
      },
      index: {
            [Segments.QUERY]: {
                  page: Joi.number().error(new Error('Invalid page!')),
            }
      },
}