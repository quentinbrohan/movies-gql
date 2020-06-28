const path = require('path');

module.exports = {
  src: path.resolve(__dirname, '../client/src'), // source files
  assets: path.resolve(__dirname, '../client/src/assets'), // assets files
  build: path.resolve(__dirname, '../client/dist'), // production build files
  static: path.resolve(__dirname, '../client/public'), // static files to copy to build folder
};
