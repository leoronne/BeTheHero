const connection = require('../../database/connection');

const incidentsRepository = require('../Repository/incidentsRepository');
const ngoRepository = require('../Repository/ngoRepository');

module.exports = {
  async index(req, res) {
    const { ngoID, page = 1 } = req.query;
    try {
      if (!ngoID) {
        const incidents = await incidentsRepository.getAll(page)
        res.header('X-Total-Count', await incidentsRepository.count());

        return res.json(incidents);
      }

      const [ngo] = await ngoRepository.getByID(ngoID);

      if (!ngo) {
        return res.status(404).send({
          message: 'NGO not found!'
        });
      };

      const incidents = await incidentsRepository.getByNGOID(ngoID)
      res.header('X-Total-Count', await incidentsRepository.countByID(ngoID));

      return res.json(incidents);
    } catch (err) {
      return res.status(500).send({
        message: err.message
      });
    }
  },

  async indexAll(req, res) {
    try {
      const incidents = await incidentsRepository.indexAll()
      res.header('X-Total-Count', await incidentsRepository.count());

      return res.json(incidents);
    } catch (err) {
      return res.status(500).send({
        message: err.message
      });
    }
  },

  async create(req, res) {
    const ngoID = req.headers.authorization;

    try {
      const [ngo] = await ngoRepository.getByID(ngoID);

      if (!ngo) {
        return res.status(404).send({
          message: 'NGO not found!'
        });
      };

      const incidentsID = await incidentsRepository.create(req.body, ngoID);

      return res.json({ incidentsID });
    } catch (err) {
      return res.status(500).send({
        message: err.message
      });
    }
  },

  async delete(req, res) {
    const ngoID = req.headers.authorization;
    const { ID } = req.query;

    try {
      const [ngo] = await ngoRepository.getByID(ngoID);

      if (!ngo) {
        return res.status(404).send({
          message: 'NGO not found!'
        });
      };

      if (!ID) {
        await incidentsRepository.deleteAll(ngoID);
        return res.status(204).send();
      }
      
      // var incidentsID = ID.split(',');
      var incidentsID = ID;

      // for (var i = 0; i < incidentsID.length; i++) {
        var [incidents] = await incidentsRepository.getByID(incidentsID);

        if (incidents.NGO_ID === ngoID) {
          await incidentsRepository.deleteByID(incidentsID);
        }
      // };

      return res.status(204).send();
    } catch (err) {
      return res.status(500).send({
        message: err.message
      });
    }
  }
};
