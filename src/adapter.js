// Our own dependencies
const hasModule      = require('./has-module'),
      toAbsolutePath = require('./to-absolute-path');

// Adapter descriptors
let adapters = [
  {
    name        : ['ram', 'mem', 'memory'],
    backend     : 'memdown',
    dependencies: ['levelup', 'memdown'],
    options     : {
      path: 'omit'
    }
  }, {
    name        : ['file', 'dir', 'leveldb', 'level'],
    backend     : 'leveldown',
    dependencies: ['levelup', 'leveldown'],
    options     : {
      path: 'absolute'
    }
  }, {
    name        : ['mongo', 'mongodb'],
    backend     : 'mongodown',
    dependencies: ['levelup', 'mongodown'],
    options     : {
      path: {protocol: 'mongodb:'}
    }
  }
];

function wrapper(descriptor) {

  // Sanity checks
  if (!descriptor) return;
  if (!descriptor.name) return;
  if (!descriptor.backend) return;
  if (!descriptor.dependencies) return;
  if (!descriptor.options) descriptor.options = {};

  // Normalize the names
  if ('string' === typeof descriptor.name) {
    descriptor.name = [descriptor.name];
  }
  if (!Array.isArray(descriptor.name)) {
    return;
  }

  // Missing dependency notifier
  for (let dependency of descriptor.dependencies) {
    if (!hasModule(dependency)) {
      descriptor.backend = function () {
        throw new Error("Missing dependency: " + dependency);
      };
      break;
    }
  }

  // Some return a levelup(-compatible) instance directly
  let levelup = descriptor.options.direct ?
    function( leveldown, location, options, callback ) {
      return leveldown(location, options, callback);
    } :
    function( leveldown, location, options, callback ) {
      return require('levelup')(leveldown(location), options, callback);
    };

  // Let's build the actual wrapper
  switch (typeof descriptor.options.path) {
    case 'string':
      switch (descriptor.options.path) {
        case 'omit':
          descriptor.wrapper = function (parsedLocation, options, callback) {
            let backend = 'function' === typeof descriptor.backend ? descriptor.backend : require(descriptor.backend);
            return levelup(backend, undefined, options, callback);
          };
          break;
        case 'absolute':
          descriptor.wrapper = function (parsedLocation, options, callback) {
            let backend = 'function' === typeof descriptor.backend ? descriptor.backend : require(descriptor.backend);
            return levelup(backend, toAbsolutePath(parsedLocation), options, callback);
          };
          break;
      }
      break;
    case 'object':
      descriptor.wrapper = function (parsedLocation, options, callback) {
        let backend = 'function' === typeof descriptor.backend ? descriptor.backend : require(descriptor.backend);
        Object.assign(parsedLocation, descriptor.options.path);
        return levelup(backend, parsedLocation.toString(), options, callback);
      };
      break;
    default:
      descriptor.wrapper = function (parsedLocation, options, callback) {
        let backend = 'function' === typeof descriptor.backend ? descriptor.backend : require(descriptor.backend);
        return levelup(backend, parsedLocation.href || parsedLocation, options, callback);
      };
      break;
  }

  return descriptor;
}

module.exports = function (autolevel) {
  for (let adapter of adapters) {
    wrapper(adapter, autolevel);
    if (!adapter.wrapper) continue;
    for (let name of adapter.name) {
      autolevel[name] = adapter.wrapper;
    }
  }
};
