const { Segments, Joi } = require('celebrate');

module.exports = {
      login: {
            [Segments.BODY]: Joi.object().keys({
                  EMAIL: Joi.string().required().email().error(new Error('Invalid email!')),
                  PASSWORD: Joi.string().required().regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')).error(new Error('Invalid password!'))
            })
      },
      validateToken: {
            [Segments.QUERY]: {
                  token: Joi.string().required().error(new Error('Token field is required!')),
            }
      },
      sendEmail: {
            [Segments.BODY]: Joi.object().keys({
                  EMAIL: Joi.string().required().email().error(new Error('Invalid email!')),                  
            })
      },
}