var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var pool = require('./modules/pool.js');

var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './public/views'));


app.get('/blogs', function(req, res){
  console.log("Retrieving blogs");
  //Get blogs from the DB
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to database: ', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // MAKE DB QUERY
      db.query('SELECT "posts"."title", "posts"."image_url", "posts"."blog_post",'+
      '"posts"."created", "users"."name" FROM "posts" JOIN "users" '+
      'ON "posts"."user_id" = "users"."id";',
      function(errMakingQuery, result){
        done();
        if(errMakingQuery){
          console.log('There was an error making SELECT query: ', errMakingQuery);
          res.sendStatus(500);
        } else {
          console.log('Retrieved all blogs from DB: ', result.rows);
          res.render("index", {blogs: result.rows}); //second variable is data object passed to client side
        }
      });
    } // end of else
  }); //end of pool.connect
}); //End of Show GET route

app.get('/', function(req, res) {
  console.log('request for index page');
  res.redirect("/blogs");
});

// Listen //
app.listen(port, function(){
   console.log('Listening on port:', port);
});
