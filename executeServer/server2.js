var express = require('express');
var multer  = require('multer');
var spawn = require('child_process').spawn;

var app = express();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage });

app.post('/executefile', upload.single('myfile'), function (req, res) {
  console.log(req.file);
  var child = spawn('python', ['uploads/'+req.file.filename]);
  var output = '';
  //child.stdout.pipe(process.stdout, { end: false });
  child.stdout.on('data', function(data) {
      console.log('stdout: ' + data);
      res.write(data);
      res.end();
      //Here is where the output goes
  });
  child.stderr.on('data', function(data) {
      console.log('stderr: ' + data);
      res.write(data);
      res.end();
      //Here is where the error output goes
  });
  child.on('close', function(code) {
      console.log('closing code: ' + code);
      //Here you can get the exit code of the script
  });
})

var server = app.listen(8082, function () {
  var host = 'localhost'
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})