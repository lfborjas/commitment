(function() {
  var app, connect, express, fs, messages, names, randline, randname;
  express = require('express');
  connect = require('connect');
  fs = require('fs');
  app = express.createServer();
  app.set('views', __dirname);
  app.set('view engine', 'haml');
  app.use(connect.staticProvider(__dirname + '/static'));
  names = ['Luis', 'Fernando', 'Jorge', 'Roberto', 'Alejandro'];
  messages = [];
  fs.readFile('commit_messages.txt', function(err, data) {
    var _a, _b, _c, _d, line;
    _a = []; _c = String(data).split('\n');
    for (_b = 0, _d = _c.length; _b < _d; _b++) {
      line = _c[_b];
      _a.push(messages.push(line));
    }
    return _a;
  });
  randline = function() {
    return messages[Math.floor(messages.length * Math.random())];
  };
  randname = function() {
    return names[Math.floor(names.length * Math.random())];
  };
  app.get('/', function(req, res) {
    var line;
    line = randline().replace("XNAMEX", randname());
    return res.render('index', {
      layout: false,
      locals: {
        message: line
      }
    });
  });
  app.get('/index.txt', function(req, res) {
    var line;
    line = randline().replace("XNAMEX", randname());
    return res.send(line);
  });
  app.listen(8000);
})();
