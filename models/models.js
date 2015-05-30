/**
 * We load mongoose
 */
var mongoose = require('mongoose');
var config = require("../config").mongoDB;

mongoose.connect('mongodb://' + config.host + "/" + config.dbName);

/**
 * We check if the connection is ok
 * If so we will continue to load everything ...
 */
var db = mongoose.connection;

console.log('Try to connect to MongoDB via Mongoose ...' + 'mongodb://' + config.host + "/" + config.dbName);

db.on('error', console.error.bind(console, 'Mongoose connection error:'));
db.once('open', function callback() {

  console.log('Connected to MongoDB !');

});

/**
 * Let's make our Mongodb Schemas/Models
 */
module.exports = {
  User: require('./User')(mongoose),
  objectId: mongoose.Types.ObjectId
};
