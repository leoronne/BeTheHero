const { Segments, Joi } = require('celebrate');

module.exports = {
      register: {
            [Segments.BODY]: Joi.object().keys({
                  NAME: Joi.string().required().error(new Error('Name is a required field!')),
                  EMAIL: Joi.string().required().email().error(new Error('Invalid email!')),
                  PASSWORD: Joi.string().required().regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')).error(new Error('Invalid password!')),
                  WHATSAPP: Joi.string().required().min(9).max(15).error(new Error('Invalid WhatsApp number!')),
                  CITY: Joi.string().required().error(new Error('City is a required field!')),
                  UF: Joi.string().required().length(2).error(new Error('Invalid UF!')),
            })
      },
      confirm: {
            [Segments.QUERY]: {
                  token: Joi.string().required().error(new Error('Token field is required!')),
            }
      },
}