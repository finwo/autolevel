const basedir = global.approot || (''+require('app-root-path')),
      path    = require('path');

module.exports = function toAbsolutePath( parsedLocation ) {
  if ( 'string' === typeof parsedLocation ) {
    parsedLocation = require('url-parse')(parsedLocation);
  }
  let targetLocation = parsedLocation.hostname + parsedLocation.pathname;
  if ( targetLocation.substr(0,1) !== '/' ) {
    targetLocation = basedir + '/' + targetLocation;
  }
  return targetLocation.replace(/\//g,path.sep);
};
