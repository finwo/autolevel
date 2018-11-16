const multilevel = require('multilevel'),
      through    = require('through'),
      WS         = require('ws'),
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
        db                = multilevel.client(),
        rpcStream         = db.createRpcStream();
  parsedLocation.protocol = proto + ':';

  // Detect simple auth
  let auth = false;
  if (parsedLocation.auth) {
    if (parsedLocation.username && parsedLocation.password) {
      auth = {
        user: parsedLocation.username,
        pass: parsedLocation.password
      };
    } else {
      auth = parsedLocation.auth;
    }
    parsedLocation.auth     = '';
    parsedLocation.username = '';
    parsedLocation.password = '';
  }

  // handle rpc output
  let queue = [];
  rpcStream.on('data', function(chunk) {
    if (ws && ws.readyState === ws.OPEN) {
      while(queue.length)
        ws.send(queue.shift());
      ws.send(chunk);
    } else {
      queue.push(chunk);
    }
  });


  // Handles connect & auth
  let ws = false;
  function reconnect(cb) {

    // Destroy old stream
    if (ws) {
      if ('function' === ws.close  ) ws.close();
      if ('function' === ws.destroy) ws.destroy();
      ws = false;
    }

    // New stream
    ws = new WS(parsedLocation.toString(), {
      perMessageDeflate: false
    });

    // Handle input messages
    ws.on('message', function(chunk) {
      rpcStream.write(chunk);
    });

    // Handle auth & callback
    ws.on('open', function() {
      if (auth) return db.auth(auth,cb);
      cb();
    });

    // Handle reconnect
    ws.on('close', function() {
      setTimeout(reconnect,10);
    });
  }

  // Initial connect
  reconnect(function(err) {
    if (err) return callback(err);
    callback(null, db);
  });
};
