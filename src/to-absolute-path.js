const basedir = global.approot || (''+require('app-root-path')),
      path    = require('path');

module.exports = function toAbsolutePath( parsedLocation ) {
  if ( 'string' === typeof parsedLocation ) {
    parsedLocation = require('url-parse')(parsedLocation);
  }
  let targetLocation = '/' + parsedLocation.hostname + parsedLocation.pathname;
  if (!( parsedLocation.protocol && parsedLocation.hostname )) {
    targetLocation = basedir + targetLocation;
  }
  return targetLocation.replace(/\//g,path.sep);
};
