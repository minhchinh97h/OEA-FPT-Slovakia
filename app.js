//GET EXPRESS AND CALL RETURNED EXP FUNCTION
var express = require('express');
var app = express();
const path = require("path");
var cfenv = require('cfenv');
var httpRequest = require('request');
const appEnv = cfenv.getAppEnv();
const port = appEnv.port || 3333;

//GET CMD ENVIRONMENT PARAMETER
const env_argument = process.argv.slice(2);

//GET CONFIG FILE and CONFIGURATION
const config = require("./config/config.js");
const environment = config.environments(env_argument);

//LINK TO BASE ROUTER
app.use(require("./controllers/routes.js"));

//DEFINE OF TEMPLATE ENGINE
app.set('view engine', 'ejs');

//DEFINE FOLDER FOR STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));
//MAKE APP TO LISTEN ON GIVEN PORT
// app.listen(environment.app_port,'localhost',function(){
//     console.log('app listen on port ' + environment.app_port);
// });
app.listen(port, () => {
  console.log("app listens at port " + port);
});


function getData(token) {

  var headers = {
    "Authorization": "Bearer " + token, //token
    "content-type": "application/json"
  }

  const url = "https://gateway.eu1.mindsphere.io/api/iottimeseries/v3/timeseries/a5c7b417952f44dea2caf8ee635b921e/generic?from=2018-05-01T00:00:00Z&to=2018-05-01T23:50:00Z";

  request.get({
    "url": url,
    "headers": headers
  }, function(err, res, body) {

    if (res.statusCode == 200) {
      console.log("GET success in MDSP");
    } else {
      console.log("GET fail in MDSP " + err);
    }

  })
}

// getData("X20Z561eAu");
