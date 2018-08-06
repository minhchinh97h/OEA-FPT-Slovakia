(function(){
  "use strict";

  var mongoose = require('mongoose');
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

  module.exports = {
    getDatabaseHandle: function(){
      mongoose.connect(connectionString);
      var db = mongoose.connection;
      db.on('error', console.error.bind(console, "Connection error:"));
      db.once('open', function(){
        console.log("Mongoose connected")
      });
    },

    connectStr: connectionString
  }


})();
