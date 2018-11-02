const path = require('path');

module.exports = function (hasModule, supported) {
  const basedir = global.approot || (''+require('app-root-path'));

  // Turn the parsed location into an absolute path
  function toAbsolutePath( parsedLocation ) {
    if ( 'string' === typeof parsedLocation ) {
      parsedLocation = require('url-parse')(parsedLocation);
    }
    let targetLocation = parsedLocation.hostname + parsedLocation.pathname;
    if ( targetLocation.substr(0,1) !== '/' ) {
      targetLocation = basedir + '/' + targetLocation;
    }
    return targetLocation.replace(/\//g,path.sep);
  }

  if (hasModule('level')) {
    // Directly use level
    supported.dir = function (parsedLocation, options, callback) {
      return require('level')(toAbsolutePath(parsedLocation), options, callback);
    };
  } else if (hasModule('levelup') && hasModule('leveldown')) {
    // Combine levelup + leveldown
    supported.dir = function (parsedLocation, options, callback) {
      return require('levelup')(require('leveldown')(toAbsolutePath(parsedLocation), options, callback);
    };
  } else {
    // Can't load this
    return false;
  }

  // Aliases
  supported.leveldb = supported.dir;
};
