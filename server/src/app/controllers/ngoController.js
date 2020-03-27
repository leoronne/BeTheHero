require('dotenv/config');

const mailer = require('../../modules/mailer');

const ngoServices = require('../Services/ngoServices');
const ngoRepository = require('../Repository/ngoRepository');

module.exports = {

  async index(req, res) {
    const { ngoID } = req.query;
    try {
      const ngo = !ngoID ? await ngoRepository.getAll() : await ngoRepository.getByID(ngoID);

      if (ngo.length === 0)
        return res.status(400).send({
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
        var link = `https://bethehero-25bcf.firebaseapp.com/TESTE?ngoid=${ID}`;

        mailer.sendMail({
          to: `${EMAIL}`,
          bc: 'betheehero@gmail.com',
          from: '"Léo, of Be The Hero" <betheehero@no-reply.com>',
          subject: `Hi ${NAME}, please confirm your email!`,
          template: 'auth/verifyemail',
          context: {
            NAME,
            link
          },
        }, (err) => {
          if (err)
            return res.status(400).send({
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
        return res.status(401).send({
          message: 'NGO not found!'
        });
      }

      if (ngo.STATUS === 'Active') {
        return res.status(401).send({
          message: 'NGO already active!'
        });
      }

      var ngo = await ngoRepository.confirmByID(ID);

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
      !ngoID ? await ngoRepository.deleteAll() : await ngoRepository.deleteByID(ngoID)

      return res.status(204).send();
    } catch (err) {
      return res.status(500).send({
        message: err.message
      });
    }
  },
};
