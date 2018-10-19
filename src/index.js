let parseUrl = require('url-parse');

// Check if a module is available
function hasModule( name ) {
  if ( require.resolve ) {
    try {
      return !!require.resolve(name);
    } catch(e) {
      return false;
    }
  }
  try {
    require(name);
    return true;
  } catch(e) {
    return false;
  }
}

/**
 * Initializes a new levelup instance, based on the given options
 *
 * @param {String}   location
 * @param {Object}   options
 * @param {Function} callback
 *
 * @return {Object|Boolean} levelup
 */
module.exports = function autolevel( location, options, callback ) {

  // Ensure proper options

  // Try to detect the url if none given
  if (!location) {
    location = ('object' === typeof process) && process.env && (
      process.env.DATABASE_URL ||
      process.env.DATABASE_URI ||
      process.env.MONGODB_URL ||
      process.env.MONGODB_URI
    ) || 'mem://';
  }

  // Load protocol initializers
  require('./mem'  )(hasModule, autolevel);
  require('./plain')(hasModule, autolevel);

  /*  TODO
      case 'mssql:'     :
      case 'mysql:'     :
      case 'mysql2:'    :
      case 'sqlite:'    :
      case 'sqlite3:'   :
      case 'postgres:'  :
      case 'postgresql:':
      case 'pg:'        : return levelup(require('sqldown')(url.format(dburl)), opts);
      */

  // Parse the given location, it should contain a protocol
  let parsedLocation = parseUrl(location),
      requested      = parsedLocation.protocol.split(':').shift().toLowerCase();

  // Ensure we have the requested protocol
  if (!(requested in autolevel)) {
    return false;
  }

  // Return what we found
  return autolevel[requested]( parsedLocation, options, callback );
};
