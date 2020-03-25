require('dotenv/config');
const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const usr = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;

const transport = nodemailer.createTransport({
  service: 'Gmail',
    auth: { user: usr, 
    pass: pass },
});

const handlebarOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: path.resolve('./src/resources/mail/'),
    layoutsDir: path.resolve('./src/resources/mail/'),
    defaultLayout: undefined,
  },
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.hbs',
};
transport.use('compile', hbs(handlebarOptions));

module.exports = transport;