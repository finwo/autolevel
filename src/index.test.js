import expect from 'expect';

// Setup environment
if ( 'object' !== typeof process ) process = {};
if (!process.env) process.env = {};
process.env.TEST = true;

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

// test('kv.genId', async () => {
//   const known = [];
//   for (let i = 0; i < 1e3; i++) {
//     let generated = await kv.genId(known);
//     expect(generated).isA(String);
//     expect(known.indexOf(generated)).toBe(known.lastIndexOf(generated));
//   }
//   for (let i = 0; i < 1e3; i++) {
//     let generated = await kv.genId(known,()=>''+Math.round(Math.random()));
//     expect(generated).isA(String);
//     expect(known.indexOf(generated)).toBe(known.lastIndexOf(generated));
//   }
//   for( let entry of testData ) {
//     let generated = await kv.genId(known);
//     testId.set( entry, generated );
//     expect(generated).isA(String);
//     expect(known.indexOf(generated)).toBe(known.lastIndexOf(generated));
//   }
// });
//
// test('kv.put', async () => {
//   for ( let entry of testData ) {
//     expect(await kv.put( testId.get(entry), entry )).toBeUndefined();
//   }
// });
//
// test('kv.get', async () => {
//   for ( let expected of testData ) {
//     expect(await kv.get( testId.get(expected), opts )).toBe(expected);
//   }
// });
//
// test('kv.find', async () => {
//   let result;
//
//   // Search for foobar
//   result = await kv.find({foo:'bar'}, opts);
//   expect(result.length).toBe(1);
//   expect(result[0].key).toBe( testId.get(testData[0]) );
//   expect(result[0].value).toBe( testData[0] );
//
//   // Search for 30cm BBQ Meat Lovers
//   result = await kv.find({size:'>25'}, opts);
//   expect(result.length).toBe(1);
//   expect(result[0].key).toBe( testId.get(testData[3]) );
//   expect(result[0].value).toBe( testData[3] );
// });
