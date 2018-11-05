import expect from 'expect';
import rimraf from 'rimraf';
import absolutePath from './to-absolute-path';

// Setup environment
if ('object' !== typeof process) process = {};
if (!process.env) process.env = {};
process.env.TEST = true;
let noop = ()=>{};

// Load extends
expect.extend(require('jest-isa'));

// Load our module
let autolevel = require('./index');

// // Initialize references
// let kv,
//     opts     = {asBuffer: false},
//     testData = [
//       JSON.stringify({foo: 'bar'}),
//       JSON.stringify({hello: {subject: 'world'}}),
//       JSON.stringify({type:'BBQ Meat Lovers', size:25}),
//       JSON.stringify({type:'BBQ Meat Lovers', size:30})
//     ],
//     testId = new Map();
//
// beforeAll(async () => {
//   kv = await (require('./kv')('mem://'));
// });

test('Ensure autolevel loads', async () => {
  expect(autolevel).toBeDefined(); // Basics
  expect(autolevel).isA(Function);
  let instance = autolevel();
  expect(instance).isA(Object);
});

test('Verify memory adapter', async () => {
  expect(autolevel).toBeDefined(); // Basics
  expect(autolevel).isA(Function);
  let instance = autolevel('mem://');
  expect(await instance.put('key', 'value')).toBeUndefined();
  expect(await instance.get('key')).isA(Buffer);
  expect(await instance.get('key', {asBuffer: false})).toBe('value');
});

test('Verify plain adapter', async () => {
  expect(autolevel).toBeDefined(); // Basics
  expect(autolevel).isA(Function);
  let instance = autolevel('dir://data/');
  expect(await instance.put('key', 'value')).toBeUndefined();
  expect(await instance.get('key')).isA(Buffer);
  expect(await instance.get('key', {asBuffer: false})).toBe('value');
  expect(await instance.close()).toBeUndefined();
  rimraf(absolutePath('dir://data'), noop);
});

/* TODO:
 *   mssql
 *   mysql
 *   mysql2
 *   mongodb
 *   sqlite
 */
