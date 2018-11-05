import expect from 'expect';

// Setup environment
if ( 'object' !== typeof process ) process = {};
if (!process.env) process.env = {};
process.env.TEST = true;
const approot  = '' + require('app-root-path'),
      path     = require('path'),
      urlParse = require('url-parse');

// Load extends
expect.extend(require('jest-isa'));

// Load our module
let toAbsolutePath = require('./to-absolute-path');

test('Ensure toAbsolutePath is a function', async () => {
  expect(toAbsolutePath).toBeDefined(); // Basics
  expect(toAbsolutePath).isA(Function);
});

test('Test some paths', async () => {
  let cases = [
    ['file:///tmp', '/tmp'],
    ['/tmp', '/tmp'],
    ['file://tmp',  approot + path.sep + 'tmp'],
    ['tmp',  approot + path.sep + 'tmp'],
  ];

  for ( let testCase of cases ) {
    expect(toAbsolutePath(testCase[0])).toBe(testCase[1]);
    expect(toAbsolutePath(urlParse(testCase[0]))).toBe(testCase[1]);
  }
});
