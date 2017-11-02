var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var pool = require('./modules/pool.js');

var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'ejs');

// SHOW route
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
          //console.log('Retrieved all blogs from DB: ', result.rows);
          res.render("index", {blogs: result.rows}); //second variable is data object passed to client side
        }
      });
    } // end of else
  }); //end of pool.connect
}); //End of SHOW route

// NEW route
app.get('/blogs/new', function(req, res){
  res.render('new');
});

// CREATE route
app.post('/blogs', function(req, res){
  //get today's date
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  //Format single digit month and year
  if(dd<10) {
    dd = '0' + dd;
  }
  if(mm<10) {
    mm = '0' + mm;
  }
  today = mm + '/' + dd + '/' + yyyy;

  //get data from form
  var title = req.body.title;
  var image = req.body.image_url;
  var post = req.body.blog_post;
  var user = 1; //Need to dynamically get this at some point

  //add to blog post DB
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to database: ', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // MAKE DB QUERY
      db.query("insert into posts(user_id, title, image_url, blog_post, created) " +
      "values($1, $2, $3, $4, $5);", [user, title, image, post, today],
      function(errMakingQuery, result){
        done();
        if(errMakingQuery){
          console.log('There was an error making INSERT query: ', errMakingQuery);
          res.sendStatus(500);
        } else {
          console.log('Blog post added');
          //redirect back to blog main page
          res.redirect('/blogs');
        }
      });
    } // end of else
  }); //end of pool.connect
}); //end of CREATE route


// EDIT route

// UPDATE route

// DESTROY route





app.get('/', function(req, res) {
  console.log('request for index page');
  res.redirect("/blogs");
});

// Listen //
app.listen(port, function(){
   console.log('Listening on port:', port);
});
