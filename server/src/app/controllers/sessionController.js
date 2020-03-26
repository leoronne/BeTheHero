const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const connection = require('../../database/connection');

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
          error: 'Invalid email!'
        });

      const ngo = await ngoRepository.getByCredentials(EMAIL, null);

      if (!ngo) {
        return res.status(401).send({
          error: 'NGO not found!'
        });
      } else {
        if (!await bcrypt.compare(PASSWORD, ngo.PASSWORD))
          return res.status(401).send({
            error: 'Invalid credentials!'
          });

        res.send(JSON.stringify(await ngoServices.generateToken({
          id: ngo.ID
        })));
      };

    } catch (err) {
      return res.status(400).send({
        error: err.message
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
          error: 'Invalid token!'
        });
      };

      const [ngo] = await ngoRepository.getByID(await ngoServices.decodeToken(token));

      if (!ngo)
        return res.status(401).send({
          error: 'NGO not found!'
        });
        
      ngo.PASSWORD = undefined;

      return res.status(200).json(ngo);
    } catch (err) {
      return res.status(400).send({
        error: err.message
      });
    }
  },
};
