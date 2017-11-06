var express = require("express");
var app = express();
var expressSanitizer = require('express-sanitizer');
var path = require("path");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var pool = require('./modules/pool.js');

var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
//using method-override to have form do PUT request
//need to tell it what to look for in the query string of the request
app.use(methodOverride('_method'));
app.use(expressSanitizer()); //needs to go after body-parser
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'ejs');

// INDEX route
app.get('/blogs', function(req, res){
  console.log("Retrieving blogs");
  //Get blogs from the DB
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to database: ', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // MAKE DB QUERY
      db.query('SELECT "posts"."id", "posts"."title", "posts"."image_url", "posts"."blog_post",'+
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
}); //End of INDEX route

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
  var post_sanitized = req.sanitize(req.body.blog_post);
  var user = 1; //Need to dynamically get this at some point

  //add to blog post DB
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to database: ', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // MAKE DB QUERY
      db.query("insert into posts(user_id, title, image_url, blog_post, created) " +
      "values($1, $2, $3, $4, $5);", [user, title, image, post_sanitized, today],
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

// SHOW route
app.get('/blogs/:id', function(req, res){
  console.log("Retrieving blog");

  //Get blog from the DB
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to database: ', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // MAKE DB QUERY
      db.query('SELECT "posts"."id", "posts"."title", "posts"."image_url", "posts"."blog_post",'+
      '"posts"."created", "users"."name" FROM "posts" JOIN "users" '+
      'ON "posts"."user_id" = "users"."id" WHERE "posts"."id" = $1;', [req.params.id],
      function(errMakingQuery, result){
        done();
        if(errMakingQuery){
          console.log('There was an error making SELECT query: ', errMakingQuery);
          res.sendStatus(500);
        } else {
          //console.log('Retrieved all blogs from DB: ', result.rows);
          res.render("show", {blogs: result.rows}); //second variable is data object passed to client side
        }
      });
    } // end of else
  }); //end of pool.connect
}); //End of SHOW route

// EDIT route
app.get('/blogs/:id/edit', function(req, res){
  console.log("Retrieving blog to edit");
  //Retrive initial blog data to update
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to database: ', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // MAKE DB QUERY
      db.query('SELECT * FROM "posts" WHERE "id" = $1;', [req.params.id],
      function(errMakingQuery, result){
        done();
        if(errMakingQuery){
          console.log('There was an error making SELECT query: ', errMakingQuery);
          res.sendStatus(500);
        } else {
          //console.log('Retrieved blog from DB: ', result.rows);
          res.render("edit", {blog: result.rows}); //second variable is data object passed to client side
        }
      });
    } // end of else
  }); //end of pool.connect
}); //End of EDIT route

// UPDATE route
app.put('/blogs/:id', function(req, res){
  //get data from form
  var title = req.body.title;
  var image = req.body.image_url;
  var post_sanitized = req.sanitize(req.body.blog_post);

  //Update blog in the DB
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to database: ', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // MAKE DB QUERY
      db.query('UPDATE "posts" SET "title" = $1, "image_url" = $2, "blog_post" = $3 ' +
      'WHERE "id" = $4;', [title, image, post_sanitized, req.params.id],
      function(errMakingQuery, result){
        done();
        if(errMakingQuery){
          console.log('There was an error making UPDATE query: ', errMakingQuery);
          res.sendStatus(500);
        } else {
          //console.log('Retrieved all blogs from DB: ', result.rows);
          res.redirect("/blogs/" + id);
        }
      });
    } // end of else
  }); //end of pool.connect
}); // end of UPDATE route

// DESTROY route
app.delete('/blogs/:id', function(req, res){
  //Delete blog from the DB
  pool.connect(function(errConnectingToDatabase, db, done){
    if(errConnectingToDatabase) {
      console.log('There was an error connecting to database: ', errConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // MAKE DB QUERY
      db.query('DELETE FROM "posts" WHERE "id" = $1;', [req.params.id],
      function(errMakingQuery, result){
        done();
        if(errMakingQuery){
          console.log('There was an error making DELETE query: ', errMakingQuery);
          res.sendStatus(500);
        } else {
          //console.log('Retrieved all blogs from DB: ', result.rows);
          res.redirect("/blogs");
        }
      });
    } // end of else
  }); //end of pool.connect
}); // end of DELETE route

// Catch all redirect
app.get('/', function(req, res) {
  console.log('request for index page');
  res.redirect("/blogs");
});

// Listen //
app.listen(port, function(){
   console.log('Listening on port:', port);
});
