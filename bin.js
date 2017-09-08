#!/usr/bin/env node

var args = process.argv.slice(1);
var build = require('./index'); //Just a sas's demo.

args.shift();
var param = args[0];
param = param || 'index.js';
process.stdout.write('dist wrap build...');
build(param, function(err){
  if(err){
    console.error('\u001b[91m', err, '\u001b[39m');
  }else{
    console.log('success!');
  }
})
