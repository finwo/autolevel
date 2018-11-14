const multilevel = require('multilevel'),
      shoe       = require('shoe'),
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
  let parsedLocation      = urlParse(location),
      proto               = protomap[parsedLocation.protocol.split(':').shift().toLowerCase()];
  parsedLocation.protocol = proto + ':';
  let db                  = multilevel.client(),
      stream              = shoe(parsedLocation.toString());
  stream.pipe(db.createRpcStream()).pipe(stream);
  return db;
};
