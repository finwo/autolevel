module.exports = function( hasModule, supported ) {

  // No levelup = can't use this
  if (!hasModule('levelup')) {
    return;
  }

  // No memdown = can't use this
  if (!hasModule('memdown')) {
    return;
  }

  // Our initializer
  supported.mem = function (parsedLocation, options, callback) {
    return require('levelup')(require('memdown')(), options, callback);
  };

  // Aliases
  supported.memory = supported.mem;
  supported.ram    = supported.mem;
};
