var express = require('express');
var app  = express() ;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
var MongoClient = require('mongodb').MongoClient;
var db;


// set rendering engine
app.set('view engine', 'ejs');

// declare to use public folder.
app.use(express.static('public'));

app.use(bodyParser.json())

app.get('/', function(req,res){
	var cursor = db.collection('Quotes').find().toArray(function(err, results) {
	  console.log(results);
		res.render('index.ejs',{quotes : results});
	});
	// res.sendFile(__dirname + '/index.html');
});

app.post('/quotes', function(req,res){
	db.collection('Quotes').save(req.body, function(err, result){
	    if (err) return console.log(err)

	    console.log('saved to database')
	    res.redirect('/')
	  })
});

app.put('/quotes', function(req,res){
	 db.collection('Quotes').findOneAndUpdate({name: 'Geet Manghnani'}, {
    $set: {
      name: req.name,
      quote: req.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, function(err, result){
	    if (err) return res.send(err)
	    res.send(result);
	})
});

MongoClient.connect('mongodb://sangeet:manghnani@ds041613.mlab.com:41613/mongo-list-app', function(err, database) {
	if (err) return console.log(err)
   db = database ;
   app.listen(3000, function(){
     console.log('listening on 3000')
   })
})
