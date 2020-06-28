const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();

// Connexion MongoDB
const MONGO_URI = 'mongodb+srv://qbrohan:Ereul9Aeng@cluster0-wpqzm.mongodb.net/movies-gql?retryWrites=true&w=majority';
if (!MONGO_URI) {
  throw new Error('Tu dois fournir une url mongoDB');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, 
{
  useMongoClient:true
});
mongoose.connection
    .once('open', () => console.log('Connecté à MongoLab'))
    .on('error', error => console.log(`Erreur de connexion à MongoLab: ${error}`));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.dev.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
