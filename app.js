const express = require("express");
const app = express();
const mustache = require("mustache-express");
const models = require("./models");
const bodyParser = require("body-parser");

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))

app.listen(3000, function(){
  console.log("SERVER RUNNING ON: http://0.0.0.0:3000")
})

app.get('/', function(req, res){
  res.render("index");
})
