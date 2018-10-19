module.exports = function( hasModule, supported ) {

  // No levelup = can't use this
  if (!hasModule('levelup')) {
    return;
  }

  // No mongodown = can't use this
  if (!hasModule('mongodown')) {
    return;
  }

  // Our initializer
  supported.mongo = function (parsedLocation, options, callback) {
    return require('levelup')( require('mongodown')(parsedLocation.href || parsedLocation), options, callback );
  };

  // Aliases
  supported.mongodb = supported.mongo;
};
