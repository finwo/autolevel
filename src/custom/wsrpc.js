const multilevel = require('multilevel'),
      WebSocket  = require('websocket-stream'),
      urlParse   = require('url-parse');

const protomap = {
  'wsrpc'  : 'ws',
  'wssrpc' : 'wss',
  'ws-rpc' : 'ws',
  'wss-rpc': 'wss',
  'rpc'    : 'ws',
  'rpcs'   : 'wss'
};

module.exports = function (location, options, callback) {

  // Setup constants
  const parsedLocation    = urlParse(location),
        proto             = protomap[parsedLocation.protocol.split(':').shift().toLowerCase()],
        db                = multilevel.client();
  parsedLocation.protocol = proto + ':';

  const queue = [];

  // Detect simple auth
  if (parsedLocation.auth) {
    if (parsedLocation.username && parsedLocation.password) {
      let user = parsedLocation.username,
          pass = parsedLocation.password;
      queue.unshift(function(callback) {
        db.auth({user,pass}, callback);
      });
    } else {
      let auth = parsedLocation.auth;
      queue.unshift(function(callback) {
        db.auth(auth, callback);
      });
    }
    parsedLocation.auth     = '';
    parsedLocation.username = '';
    parsedLocation.password = '';
  }

  // Connect
  queue.unshift(function(callback) {
    let stream = new WebSocket(parsedLocation.toString(), {
      perMessageDeflate: false
    });
    stream.pipe(db.createRpcStream()).pipe(stream);
    callback();
  });

  // Queue runner
  (function next(err) {
    if (err) return callback(err);     // Error handling
    let fn = queue.shift();            // Fetch next function
    if (!fn) return callback(null,db); // Done
    fn(next);                          // Run next
  })();
};
