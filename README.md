# autolevel
> Automatically use the right abstract-leveldown module for your configuration

[![pipeline status](https://gitlab.com/finwo/autolevel/badges/master/pipeline.svg)](https://gitlab.com/finwo/autolevel/commits/master)
[![coverage report](https://gitlab.com/finwo/autolevel/badges/master/coverage.svg)](https://gitlab.com/finwo/autolevel/commits/master)
[![npm](https://img.shields.io/npm/v/autolevel.svg?style=flat-square)](https://www.npmjs.com/package/autolevel)

## Installation

```bash
npm install --save autolevel
```

For a full installation, supporting all types included in the code, run the following:

```bash
npm install --save autolevel levelup leveldown mongodown memdown sqldown mssql mysql mysql2 sqlite3 pg pg-query-stream
```

## Why

I was tired of looking for which combination of modules to install every time I started a new project for myself or
work. This is simply a documented wrapper for common abstract-leveldown adapters, passing options to the used
abstract-leveldown module and returning a levelup instance.

Below you'll find which extra dependencies you'd need to connect to certain backends.

## Examples

```js
// Load autolevel
const autolevel = require('autolevel');

// Some variables we'll show
var db;

// Autodetect backend using environment variables
db = autolevel();

// Load database from folder, relative to the app root
db = autolevel('dir://data/');

// Load database from folder, absolute path
db = autolevel('dir:///data/');

// Use mongodb storage
db = autolevel('mongodb://localhost:27017/database');

// Use authenticated mysql backend
db = autolevel('mysql://username:password@host:3306/database');

```

## Adapters

 type      | schemes/protocols        | driver                 | Dependencies
 --------- | ------------------------ | ---------------------- | ------------------------------------------
 plain     | dir, level, leveldb      | [leveldown][leveldown] | [levelup][levelup], [leveldown][leveldown]
 mongodb   | mongo, mongodb           | [mongodown][mongodown] | [levelup][levelup], [mongodown][mongodown]
 in-memory | ram, mem, memory         | [memdown][memdown]     | [levelup][levelup], [memdown][memdown]
 mssql     | mssql                    | [sqldown][sqldown]     | [levelup][levelup], [sqldown][sqldown], [mssql][mssql]
 mysql     | mysql                    | [sqldown][sqldown]     | [levelup][levelup], [sqldown][sqldown], [mysql][mysql]
 mysql2    | mysql2                   | [sqldown][sqldown]     | [levelup][levelup], [sqldown][sqldown], [mysql2][mysql2]
 sqlite3   | sqlite, sqlite3          | [sqldown][sqldown]     | [levelup][levelup], [sqldown][sqldown], [sqlite3][sqlite3]
 postgres  | pg, postgres, postgresql | [sqldown][sqldown]     | [levelup][levelup], [sqldown][sqldown], [pg][pg], [pg-query-stream][pg-query-stream]
 
## TODO

- Think up a nice 'plugin' style of adding adapters
- Throw exception explaining which package is missing when loading an adapters

[level]: https://npmjs.com/package/level
[levelup]: https://npmjs.com/package/levelup
[leveldown]: https://npmjs.com/package/leveldown
[mongodown]: https://npmjs.com/package/mongodown
[memdown]: https://npmjs.com/package/memdown
[mssql]: https://npmjs.com/package/mssql
[mysql]: https://npmjs.com/package/mysql
[mysql2]: https://npmjs.com/package/mysql2
[pg]: https://npmjs.com/package/pg
[pg-query-stream]: https://npmjs.com/package/pg-query-stream
[sqldown]: https://npmjs.com/package/sqldown
[sqlite3]: https://npmjs.com/package/sqlite3
