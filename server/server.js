const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const { DATABASE_URI } = process.env;

const MONGO_URI = DATABASE_URI;
if (!MONGO_URI) {
  throw new Error("Tu dois fournir une url mongoDB");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
  useMongoClient: true,
});
mongoose.connection
  .once("open", () => console.log("Connecté à MongoDB"))
  .on("error", (error) =>
    console.log(`Erreur de connexion à MongoDB: ${error}`)
  );

app.use(bodyParser.json());
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../config/webpack.dev.js");
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
