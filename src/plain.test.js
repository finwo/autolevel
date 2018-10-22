import expect from 'expect';
import rimraf from 'rimraf';

// Setup environment
if ( 'object' !== typeof process ) process = {};
if (!process.env) process.env = {};
process.env.TEST = true;

// Load extends
expect.extend(require('jest-isa'));

// Load our module
let autolevel = require('./index'),
    adapter   = false;

test('Ensure autolevel loads', async () => {
  expect(autolevel).toBeDefined(); // Basics
  expect(autolevel).isA(Function);
  let instance = autolevel();
  expect(instance).isA(Object);
});

test('Verify adapter loads', async () => {
  // TODO
  // adapter = autolevel('dir://');
  // expect(adapter).isA(Object);
});

test('Storing data', async () => {
  // TODO
  // let result = await adapter.put('key','value');
  // expect(result).toBeUndefined();
});

test('Fetching data', async () => {
  // TODO
  // let result = await adapter.get('key', { asBuffer: false });
  // expect(result).toBe('value');
});
