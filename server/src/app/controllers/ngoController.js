require('dotenv/config');

const crypto = require('crypto');

const mailer = require('../../modules/mailer');

const ngoServices = require('../Services/ngoServices');
const ngoRepository = require('../Repository/ngoRepository');

module.exports = {

  async index(req, res) {
    const { ngoID } = req.query;
    try {
      const ngo = await ngoRepository.getAll(ngoID);

      if (ngo.length === 0)
        return res.status(404).send({
          message: 'NGO not found!'
        });

      return res.json(ngo);
    } catch (err) {
      return res.status(500).send({
        message: err.message
      });
    }
  },

  async create(req, res) {
    const {
      EMAIL,
      WHATSAPP,
      NAME
    } = req.body;
    try {
      if (!await ngoServices.validateEmailAddress(EMAIL))
        return res.status(401).send({
          message: 'Invalid email!'
        });
      const ngo = await ngoRepository.getByCredentials(EMAIL, WHATSAPP);

      if (!ngo) {
        const ID = await ngoRepository.create(req.body);
        var link = `https://bethehero-25bcf.firebaseapp.com/confirm?ngoid=${ID}`;

        mailer.sendMail({
          to: `${EMAIL}`,
          bc: process.env.GMAIL_USER,
          from: '"Léo, of Be The Hero" <betheehero@no-reply.com>',
          subject: `Hi ${NAME}, please confirm your email!`,
          template: 'auth/verifyemail',
          context: {
            NAME,
            link
          },
        }, (err) => {
          if (err)
            return res.status(503).send({
              message: err.message
            });
        });

        return res.json({ ID });

      } else {
        return res.status(401).send({
          message: 'You are already registered on our platform!'
        });
      }
    } catch (err) {
      return res.status(500).send({
        message: err.message
      });
    }
  },

  async confirm(req, res) {
    const { ID } = req.body;
    try {
      var [ngo] = await ngoRepository.getByID(ID);

      if (!ngo) {
        return res.status(404).send({
          message: 'NGO not found!'
        });
      }

      if (ngo.STATUS === 'Active') {
        return res.status(401).send({
          message: 'NGO is already active!'
        });
      }

      var [ngo] = await ngoRepository.confirmByID(ID);

      return res.json(ngo);
    } catch (err) {
      return res.status(500).send({
        message: err.message
      });
    }
  },

  async delete(req, res) {
    const { ngoID } = req.query;

    try {
      if (!ngoID) {
        await ngoRepository.deleteAll();
        return res.status(204).send();
      }

      var [ngo] = await ngoRepository.getByID(ngoID);

      if (!ngo) {
        return res.status(404).send({
          message: 'NGO not found!'
        });
      }

      await ngoRepository.deleteByID(ngoID)

      return res.status(204).send();
    } catch (err) {
      return res.status(500).send({
        message: err.message
      });
    }
  },

  async forgotPassword(req, res) {
    const {
      EMAIL
    } = req.body

    try {
      const ngo = await ngoRepository.getByCredentials(EMAIL, null);

      if (!ngo)
        return res.status(404).send({
          message: 'NGO not found!'
        });

      const token = crypto.randomBytes(20).toString('hex');
      const name = ngo.NAME;
      const now = new Date();

      now.setHours(now.getHours() + 1);
      await ngoRepository.setPasswordReset(ngo.ID, token, now);

      mailer.sendMail({
        to: `${ngo.EMAIL}`,
        bc: process.env.GMAIL_USER,
        from: '"Léo, of Be The Hero" <betheehero@no-reply.com>',
        subject: `Hey ${name}, do you need to change your password?`,
        template: 'auth/forgotPassword',
        context: {
          name,
          link: `${process.env.APP_URL}updatepassword?token=${await ngoServices.generateToken({
            id: ngo.ID
          })}&passtoken=${token}`
        },
      }, (err) => {
        if (err)
          return res.status(503).send({
            message: err.message
          });
      });

      return res.status(200).send(JSON.stringify(token));

    } catch (err) {
      return res.status(500).send({
        message: err.message
      });
    }
  },

  async  validPasswordToken(req, res) {
    const {
      passtoken,
      token
    } = req.query

    try {
      if (await ngoServices.validateToken(token) === false) {
        return res.status(401).send({
          message: 'Invalid token!'
        });
      };

      const [ngo] = await ngoRepository.getByID(await ngoServices.decodeToken(token));

      if (!ngo)
        return res.status(404).send({
          message: 'NGO not found!'
        });

      if (passtoken !== ngo.PASSTOKEN)
        return res.status(401).send({
          message: 'Invalid token!'
        });

      const now = new Date();
      const passDate = new Date(ngo.PASSRESET);
      if (!now > passDate)
        return res.status(401).send({
          message: 'Password token expired!'
        })

      return res.status(204).send();
    } catch (err) {
      return res.status(500).send({
        message: err.message
      });
    }
  },

  async  updatepassword(req, res) {
    const {
      PASSWORD,
    } = req.body

    const passtoken = req.headers.passtoken;
    const token = req.headers.authorization;

    try {
      var strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

      if (await ngoServices.validateToken(token) === false) {
        return res.status(401).send({
          message: 'Invalid token!'
        });
      };

      const [ngo] = await ngoRepository.getByID(await ngoServices.decodeToken(token));

      if (!ngo)
        return res.status(404).send({
          message: 'NGO not found!'
        });

      if (passtoken !== ngo.PASSTOKEN)
        return res.status(401).send({
          message: 'Invalid token!'
        });

      const now = new Date();
      const passDate = new Date(ngo.PASSRESET);
      if (!now > passDate)
        return res.status(401).send({
          message: 'Password token expired!'
        })

      if (!strongRegex.test(PASSWORD))
        return res.status(401).send({
          message: 'Invalid password!'
        })

      const name = ngo.NAME;

      const link = process.env.APP_URL

      await ngoRepository.updatePassword(ngo.ID, PASSWORD);

      mailer.sendMail({
        to: `${ngo.EMAIL}`,
        bc: process.env.GMAIL_USER,
        from: '"Léo, of Be The Hero" <betheehero@no-reply.com>',
        subject: `Hi ${name}, your password was changed!`,
        template: 'auth/updatePassword',
        context: {
          name,
          link
        },
      }, (err) => {
        if (err)
          return res.status(503).send({
            message: err.message
          });
      });

      return res.status(200).json(await ngoRepository.getAll(ngo.ID));
    } catch (err) {
      res.status(500).send({
        message: err.message
      })
    }
  }

};
