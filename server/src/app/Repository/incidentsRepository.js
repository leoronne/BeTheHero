'use strict';
const connection = require('../../database/connection');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

module.exports = {
    async getByNGOID(ngoID) {
        const incidents = await connection('INCIDENTS')
            .join('NGO', 'NGO.ID', '=', 'INCIDENTS.NGO_ID')
            .where('NGO_ID', ngoID)
            .select([
                'INCIDENTS.*',
                'NGO.NAME',
                'NGO.EMAIL',
                'NGO.WHATSAPP',
                'NGO.CITY',
                'NGO.UF'
            ]);
        return incidents;
    },
    async getByID(ID) {
        const incidents = await connection('INCIDENTS')
            .where('id', ID)
            .select('*'
            );
        return incidents;
    },
    async getAll(page) {
        const incidents = await connection('INCIDENTS')
            .join('NGO', 'NGO.ID', '=', 'INCIDENTS.NGO_ID')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'INCIDENTS.*',
                'NGO.NAME',
                'NGO.EMAIL',
                'NGO.WHATSAPP',
                'NGO.CITY',
                'NGO.UF'
            ]);

        return incidents;
    },
    async create(data, ngoID) {
        const {
            TITLE,
            DESCRIPTION,
            VALUE
        } = data;


        const [ID] = await connection('INCIDENTS').insert({
            TITLE,
            DESCRIPTION,
            VALUE,
            NGO_ID: ngoID
        });

        return ID;
    },
    async count() {
        const [count] = await connection('INCIDENTS').count();

        return count['count(*)'];
    },
    async countByID(NGO_ID) {
        const [count] = await connection('INCIDENTS').where({ NGO_ID }).count();

        return count['count(*)'];
    },
    async deleteByID(incidentsID) {
        await connection('INCIDENTS').delete().whereIn('id', incidentsID.split(','));
    },
    async deleteAll(NGO_ID) {
        await connection('INCIDENTS').delete().where({ NGO_ID });
    },

};

