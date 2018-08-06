const express = require("express");
const router = express.Router();

var mongoUtils = require('../mongoUtilities');
// var mongodbUtils = require('../mongodbUtilities')
// var mongooseUtils = require('../mongooseUtilities');


//INCLUDING DIRECT ROUTES

// router.get("/mongoose", function(req, res) {
//   mongooseUtils.getDatabaseHandle();
//   res.send(mongooseUtils.connectStr);
// })

// router.get("/mongodb", function(req, res){
//   mongodbUtils.getDatabaseHandle();
//
//   res.send(mongodbUtils.connectStr);
// })

//To verify the connection between mindsphere app and mongodb through mongojs. If connected,
//the page will display the connected uri from mongodb32 service of Cloud Foundry.
router.get("/mongojs", function(req, res){
  var db = mongoUtils.getDatabaseHandle();

  res.send(mongoUtils.connectStr);
})






router.get("/", function(req, res) {
  const content = {
    "head": "./components/dashboard1/head",
    // "head": "vendor_content/headers/form",
    "content": "components/dashboard1/content",
    "scripts": "vendor_content/scripts/form"
    // "scripts": "vendor_content/scripts/empty"
  }
  res.render("main_dashboard", {
    "content": content
  });
  // res.render("main_dashboard");
})

router.get("/sample1", function(req, res) {

  const sample1 = {
    "name": "Sample 1",
    "content": "../customer/variations/contents/content1",
    "sidemenu": "../customer/variations/sidemenus/sidemenu1"
  }
  res.render("customer/oea_sample", {
    "sample": sample1
  });
});

router.get("/sample2", function(req, res) {

  const sample2 = {
    "name": "Sample 2",
    "content": "../customer/variations/contents/content2",
    "sidemenu": "../customer/variations/sidemenus/sidemenu2"
  }
  res.render("customer/oea_sample", {
    "sample": sample2
  });
});

router.get("/sample3", function(req, res) {

  const sample3 = {
    "name": "Sample 3",
    "content": "../customer/variations/contents/content3",
    "sidemenu": "../customer/variations/sidemenus/sidemenu3"
  }
  res.render("customer/oea_sample", {
    "sample": sample3
  });
});

router.get("/sample4", function(req, res) {

  const sample4 = {
    "name": "Sample 4",
    "content": "../customer/variations/contents/content4",
    "sidemenu": "../customer/variations/sidemenus/sidemenu4"
  }
  res.render("customer/oea_sample", {
    "sample": sample4
  });
});

router.get("/form/general", function(req, res) {

  res.render("vendor_content/form");
});

router.get("/form/advanced", function(req, res) {
  const content = {
    "head": "vendor_content/headers/form",
    "content": "vendor_content/formX",
    "scripts": "vendor_content/scripts/form"
  }
  //  res.send( { "content" : content });
  res.render("main_dashboard", {
    "content": content
  });
});

router.get("/form/assets", function(req,res){
  const content = {
    "head": "vendor_content/headers/form",
    "content":"vendor_content/assets",
    "scripts": "vendor_content/scripts/form"
  }

  res.render("main_dashboard", {
    "content": content
  });
});

router.get("/form/timeseries/:filter?", function(req, res){
  const content = {
    "head": "vendor_content/headers/form",
    "content":"vendor_content/timeseries",
    "scripts": "vendor_content/scripts/form"
  }

  res.render("main_dashboard", {
    "content": content
  });
});

router.get("/form/visualizedData", function(req, res){
  const content = {
    "head": "vendor_content/headers/form",
    "content":"vendor_content/visualizedData",
    "scripts": "vendor_content/scripts/form"
  }

  res.render("main_dashboard", {
    "content": content
  });
});

router.get("/form/requirement221", function(req, res){
  const content = {
    "head": "vendor_content/headers/form",
    "content":"vendor_content/requirements/requirement2-2-1",
    "scripts": "vendor_content/scripts/form"
  }

  res.render("main_dashboard", {
    "content": content
  });
})

router.get("/form/requirement222", function(req, res){
  const content = {
    "head": "vendor_content/headers/form",
    "content":"vendor_content/requirements/requirement2-2-2_01",
    "scripts": "vendor_content/scripts/form"
  }

  res.render("main_dashboard", {
    "content": content
  });
})

router.get("/form/requirement223", function(req, res){
  const content = {
    "head": "vendor_content/headers/form",
    "content":"vendor_content/requirements/requirement2-2-3",
    "scripts": "vendor_content/scripts/form"
  }

  res.render("main_dashboard", {
    "content": content
  });
})

router.get("/form/requirement224", function(req, res){
  const content = {
    "head": "vendor_content/headers/form",
    "content":"vendor_content/requirements/requirement2-2-4_01",
    "scripts": "vendor_content/scripts/form"
  }

  res.render("main_dashboard", {
    "content": content
  });
})


router.get("/form/requirement225", function(req, res){
  const content = {
    "head": "vendor_content/headers/form",
    "content":"vendor_content/requirements/requirement2-2-5",
    "scripts": "vendor_content/scripts/form"
  }

  res.render("main_dashboard", {
    "content": content
  });
})

router.get("/form/r224test", function(req, res){
  const content = {
    "head": "vendor_content/headers/form",
    "content":"vendor_content/test/r224test",
    "scripts": "vendor_content/scripts/form"
  }

  res.render("main_dashboard", {
    "content": content
  });
})

module.exports = router;
