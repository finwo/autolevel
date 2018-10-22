module.exports = function( hasModule, supported ) {

  // No levelup = can't use this
  if (!hasModule('levelup')) {
    return;
  }

  // No memdown = can't use this
  if (!hasModule('sqldown')) {
    return;
  }

  // Our initializer
  supported.sql = function(parsedLocation, options, callback) {
    return require('levelup')(require('sqldown')(parsedLocation.href), options, callback);
  };

  // Aliases
  supported.mssql      = supported.sql;
  supported.mysql      = supported.sql;
  supported.mysql2     = supported.sql;
  supported.sqlite     = supported.sql;
  supported.sqlite3    = supported.sql;
  supported.postgres   = supported.sql;
  supported.postgresql = supported.sql;
  supported.pg         = supported.sql;
};
