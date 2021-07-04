const test = require('tape');
const isBuffer = require('is-buffer');

const rimraf = require('rimraf');
const absolutePath = require('./to-absolute-path');

// Setup environment
if ('object' !== typeof process) process = {};
if (!process.env) process.env = {};
process.env.TEST = true;
const noop = ()=>{};

// Load our module
const autolevel = require('./index');

//// // Initialize references
//// let kv,
////     opts     = {asBuffer: false},
////     testData = [
////       JSON.stringify({foo: 'bar'}),
////       JSON.stringify({hello: {subject: 'world'}}),
////       JSON.stringify({type:'BBQ Meat Lovers', size:25}),
////       JSON.stringify({type:'BBQ Meat Lovers', size:30})
////     ],
////     testId = new Map();
////
//// beforeAll(async () => {
////   kv = await (require('./kv')('mem://'));
//// });

test('Ensure autolevel loads', async t => {
  t.plan(2);

  t.equal(typeof autolevel  , 'function', 'Exported module should be a function');
  t.equal(typeof autolevel(), 'object'  , 'Running exported function returns an object');
});

test('Verify memory adapter', async t => {
  t.plan(3);

  const instance = autolevel('mem://');
  t.equal(await instance.put('key', 'value') , undefined, 'put returns nothing');
  t.equal(isBuffer(await instance.get('key')), true     , 'get returns a buffer');
  t.equal(await instance.get('key', {asBuffer:false})   , 'value'  , 'get returns original value');
});

test('Verify plain adapter', async t => {
  t.plan(4);

  const instance = autolevel('dir://data/');
  t.equal(await instance.put('key', 'value') , undefined, 'put returns nothing');
  t.equal(isBuffer(await instance.get('key')), true     , 'get returns a buffer');
  t.equal(await instance.get('key', {asBuffer:false})   , 'value'  , 'get returns original value');
  t.equal(await instance.close(), undefined, 'close returns undefined');
  rimraf(absolutePath('dir://data'), noop);
});

///* TODO:
// *   mssql
// *   mysql
// *   mysql2
// *   mongodb
// *   sqlite
// */
