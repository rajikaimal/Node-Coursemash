var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('cookie-session');
var fs = require('fs');
var multer = require('multer');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest : './uploads'}));


app.set('trust proxy',1);
//sessions
app.use(session({
	keys : ['key1', 'key2']
}));

app.get('/',function(req,res){
	res.render('index.html');
});

app.get('/index',function(req,res){
	res.redirect('/');
});

app.post('/login',function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	if(username == 'rajika' && password == 22){
		res.redirect('/home');
	}
	else{
		res.redirect('/');
	}
});

app.get('/home',function(req,res){
	res.render('/home/index.html');
});

app.get('/myroute',function(req,res){
	var n = req.session.views || 0;
	req.session.views = ++n;
	res.end(n +' views');
});

app.get('/upload',function(req,res){
	res.render('/upload');
});

app.post('/upload/file',function(req,res){
	fs.readFile(req.files.answerfile.path,function(err,data){
		if(err) console.log(err);
		var newPath = __dirname + "/uploads/";
		fs.writeFile(newPath,data,function(err){
			console.log('Success');
			var type = req.body.type;
			var semester = req.body.semester;
			var module = req.body.module;
			var year = req.body.year;
			res.redirect('/upload');
		});
	});
});

app.listen(3000,function(){
	console.log('Server listening on port 3000');
});