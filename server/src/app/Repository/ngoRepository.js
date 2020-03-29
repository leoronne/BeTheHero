'use strict';
const connection = require('../../database/connection');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

module.exports = {
    async getByID(ngoID) {
        const ngo = await connection('NGO').select('*').whereIn('ID', ngoID.split(','));

        return ngo;
    },
    async getAll(ID) {
        const ngo = !ID ? await connection('NGO').select(
            'ID',
            'EMAIL',
            'WHATSAPP',
            'NAME',
            'CITY',
            'UF',
            'STATUS',
            'PASSTOKEN',
            'PASSRESET',
            'created_at',
            'updated_at'
        ) : await connection('NGO').select(
            'ID',
            'EMAIL',
            'WHATSAPP',
            'NAME',
            'CITY',
            'UF',
            'STATUS',
            'PASSTOKEN',
            'PASSRESET',
            'created_at',
            'updated_at'
        ).where({ ID });
        return ngo;
    },
    async getByCredentials(EMAIL, WHATSAPP) {
        const [ngo] = await connection('NGO').select('*').where({
            EMAIL
        })
            .orWhere({
                WHATSAPP
            });

        return ngo;
    },
    async create(data) {
        const {
            EMAIL,
            WHATSAPP,
            PASSWORD,
            NAME,
            CITY,
            UF } = data;

        const ID = await crypto.randomBytes(4).toString('HEX');

        const cryptPass = await bcrypt.hash(PASSWORD, 10);

        await connection('NGO').insert({
            ID,
            EMAIL,
            WHATSAPP,
            PASSWORD: cryptPass,
            NAME,
            CITY,
            UF
        });

        return ID;
    },
    async confirmByID(ngoID) {
        await connection('NGO').whereIn('ID', ngoID.split(',')).update({
            STATUS: 'Active'
        });

        const ngo = await connection('NGO').select(
            'ID',
            'EMAIL',
            'WHATSAPP',
            'NAME',
            'CITY',
            'UF',
            'STATUS'
        ).whereIn('ID', ngoID.split(','));

        return ngo;
    },
    async deleteByID(ngoID) {
        await connection('INCIDENTS').delete().whereIn('NGO_ID', ngoID.split(','));
        await connection('NGO').delete().whereIn('ID', ngoID.split(','));
    },
    async deleteAll() {
        await connection('INCIDENTS').delete();
        await connection('NGO').delete();
    },
    async setPasswordReset(ngoID, token, date) {
        await connection('NGO').where('ID', ngoID).update({
            'PASSTOKEN': token,
            'PASSRESET': date
        });
    },
    async updatePassword(ngoID, password) {
        const cryptPass = await bcrypt.hash(password, 10);

        await connection('NGO').where('ID', ngoID).update({
            'PASSWORD': cryptPass,
            'PASSTOKEN': null,
            'PASSRESET': null
        });
    },
};

