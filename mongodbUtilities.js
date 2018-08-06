"use strict";

var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var cfenv = require("cfenv");
var appEnv = cfenv.getAppEnv();
var httpRequest = require('request');
var services = appEnv.getServices();
var connectionString = "mongodb://localhost/oea-db-dmc";

if (!appEnv.isLocal && process.env.hasOwnProperty('CONFIG') && services != undefined) {

  // var cfg = JSON.parse(process.env.CONFIG);
  //
  // if (cfg.hasOwnProperty('mongoservice')) {
  //     if(services.hasOwnProperty(cfg.mongoservice)){
  //         connectionString = services[cfg.mongoservice].credentials.uri;
  //     }
  // }

  var cfg = JSON.parse(process.env.VCAP_SERVICES);

  connectionString = cfg.mongodb32[0].credentials.uri;
}

function onDatabaseError(err) {
  console.log('database error', err);
}

function onDatabaseConnection() {
  console.log('database connected');
}

module.exports = {
  getDatabaseHandle: function(req, res, next) {
    mongoClient.connect(connectionString, function(err, client){
      assert.equal(null, err);
      console.log("mongodb connected");
    })
  },

  connectStr: connectionString
};
