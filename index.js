var fs = require('fs');
var distWrap = require('dist-wrap');
var terser = require("terser");
var path = require('path');
var sas = require('sas');
var mkdirp = require('mkdirp');
function build(srcPath, opt, callback){
  srcPath = path.resolve(srcPath);
  var obj = path.parse(srcPath);
  var onlyMin = opt.onlyMin || true;
  var baseName = path.basename(srcPath, '.js');

  var source = fs.readFileSync(srcPath, 'utf-8');
  var wraped = distWrap(source);
  var wrapedCode = wraped.code;
  var headerNote = wraped.headNote;
  var distDir = path.join(obj.dir, 'dist');
  var distPath = path.join(distDir, baseName + '.js');
  var distMinPath = path.join(distDir, baseName + '.min.js');
  // console.log('distPath', distPath)
  // console.log('distMinPath', distMinPath)

  function writeMinDist(cb){
    fs.writeFile(distMinPath, headerNote + terser.minify(wrapedCode).code, cb);
  }
  mkdirp.sync(distDir);
  let tasks = {
    writeMinDist
  }
  if(!onlyMin){
    tasks.writeDist = function writeDist(cb){
      fs.writeFile(distPath, headerNote + wrapedCode, cb);
    };
  }
  sas(tasks, callback)
}

module.exports = build;
