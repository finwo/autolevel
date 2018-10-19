module.exports = function (hasModule, supported) {

  if (hasModule('level')) {
    // Directly use level
    supported.dir = function (parsedLocation, options, callback) {
      return require('level')(parsedLocation.href || parsedLocation, options, callback);
    };
  } else if (hasModule('levelup') && hasModule('leveldown')) {
    // Combine levelup + leveldown
    supported.dir = function (parsedLocation, options, callback) {
      return require('levelup')(require('leveldown')(parsedLocation.href || parsedLocation), options, callback);
    };
  } else {
    // Can't load this
    return false;
  }

  // Aliases
  supported.leveldb = supported.dir;
};
