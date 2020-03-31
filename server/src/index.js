require('dotenv/config');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { errors } = require('celebrate');

const copyright = require('./routes/copyright');
const ngo = require('./routes/ngoRoutes');
const incidents = require('./routes/incidentsRoutes');
const session = require('./routes/sessionRoutes');

const app = express();

const swaggerDefinition = require('./swagger.json');

const swaggerOptions = {
      swaggerDefinition,
      apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

app.get('/api-doc.json', function (req, res) {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,  {
      explorer: false,
      customCss: '.swagger-ui .topbar {display :none} ',
      customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.1/themes/3.x/theme-material.css',
      customfavIcon: "https://raw.githubusercontent.com/leoronne/BeTheHero/master/assets/img/favicon.ico",
      customSiteTitle: 'Be The Hero - API Documentation',
}));

app.use(cors());
app.use(express.json());

app.use('/', copyright);
app.use('/ngo', ngo);
app.use('/session', session);
app.use('/incidents', incidents);

app.use(errors());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
});