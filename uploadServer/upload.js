var express = require('express');
var request = require('request');
var multer  = require('multer');
var redis = require('redis');
var fs = require('fs');

var app = express();
var storage = multer.diskStorage({
	destination: function (req, file, cb) {cb(null, 'uploads')},
  	filename: function (req, file, cb) {cb(null, file.originalname)}
  });
var upload = multer({ storage: storage });
var client = redis.createClient();

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
});

app.post('/uploadfile', upload.single('file'), function (req, res) {
	// TODO (Jiapei) : unfinished handle unfind stituation
	var pending = true;
	for (var i=0; i<2; i++) {
		client.hgetall('port:' + (i+1), function (err, reply) {
			console.log(reply);
			if (reply.status == 0) {
				if (pending) {
					console.log('port pending:' + reply.port);
					pending = false;
					client.hset('port:' + reply.id, 'status', '1');

					client.hgetall('port:' + reply.id, function (err, reply) {
						console.log(reply.id + ':' + reply.status);
					});

					postToExecute(reply, req, res);
				}
			}
		});
	}
});

function postToExecute(reply,req,res)
{
	// TODO (Lingbo) : unfinished xxx function
	var formData = {
		myfile : fs.createReadStream(__dirname + '/uploads/' + req.file.originalname)
	};

	var url = 'http://localhost:' + reply.port + '/executefile';
	console.log('Posting ' + req.file.originalname + ' to ' + url);
	request.post({url:url, formData:formData}, function optionalCallback(error, response, body) {
		if(error) {
			console.log('Eroor: ' + error);
			client.hset('port:'+reply.id, 'status', '0');
			res.end(error);
		} else {
			console.log('Result: ' + body);
			client.hset('port:'+reply.id, 'status', '0');
			res.end(body);
		}
	});
}

var server = app.listen(8080, function () {
  var host = 'localhost';
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});