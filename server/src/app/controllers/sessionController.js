const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const connection = require('../../database/connection');
const mailer = require('../../modules/mailer');

const ngoServices = require('../Services/ngoServices');
const ngoRepository = require('../Repository/ngoRepository');

module.exports = {
  async create(req, res) {
    const {
      EMAIL,
      PASSWORD,
    } = req.body;

    try {
      if (!await ngoServices.validateEmailAddress(EMAIL))
        return res.status(401).send({
          message: 'Invalid email!'
        });

      const ngo = await ngoRepository.getByCredentials(EMAIL, null);

      if (!ngo) {
        return res.status(401).send({
          message: 'NGO not found!'
        });
      }

      if (!await bcrypt.compare(PASSWORD, ngo.PASSWORD))
        return res.status(401).send({
          message: 'Invalid credentials!'
        });


      if (ngo.STATUS !== 'Active') {
        return res.status(401).send({
          message: 'Please, you need to verify your email adress first!'
        });
      }
      var token = await ngoServices.generateToken({
        id: ngo.ID
      });
      res.json({
        token,
        name: ngo.NAME,
        ngoID: ngo.ID
      });


    } catch (err) {
      return res.status(400).send({
        message: err.message
      });
    }
  },
  async validateToken(req, res) {
    const {
      token
    } = req.query;

    try {
      if (await ngoServices.validateToken(token) === false) {
        return res.status(401).send({
          message: 'Invalid token!'
        });
      };

      const [ngo] = await ngoRepository.getByID(await ngoServices.decodeToken(token));

      if (!ngo)
        return res.status(401).send({
          message: 'NGO not found!'
        });

      ngo.PASSWORD = undefined;

      return res.status(200).json(ngo);
    } catch (err) {
      return res.status(400).send({
        message: err.message
      });
    }
  },

  async sendEmail(req, res) {
    const {
      EMAIL
    } = req.body;
    try {

      if (!await ngoServices.validateEmailAddress(EMAIL))
        return res.status(401).send({
          message: 'Invalid email!'
        });

      const ngo = await ngoRepository.getByCredentials(EMAIL, null);

      if (!ngo)
        return res.status(401).send({
          message: 'NGO not found!'
        });

      if (ngo.STATUS === 'Active') {
        return res.status(401).send({
          message: 'NGO already active!'
        });
      }

      const ID = ngo.ID;
      var link = `https://bethehero-25bcf.firebaseapp.com/confirm?ngoid=${ID}`;

      mailer.sendMail({
        to: `${EMAIL}`,
        bc: 'betheehero@gmail.com',
        from: '"Léo, of Be The Hero" <betheehero@no-reply.com>',
        subject: `Hi ${ngo.NAME}, please confirm your email!`,
        template: 'auth/verifyemail',
        context: {
          NAME: ngo.NAME,
          link
        },
      }, (err) => {
        if (err)
          return res.status(400).send({
            message: err.message
          });
      });

      return res.status(204).send();
    } catch (err) {
      return res.status(500).send({
        message: err.message
      });
    }
  },
};
