const ts = require('ts-node')
ts.register({
  fast:true,
  cacheDirectory:".tmp",
  compilerOptions:{
    "module": "commonjs",
    "target": "es6"
  }

})
require('./api-gen/index')
