var fs = require('fs');
var distWrap = require('dist-wrap');
var uglify = require('uglify-js');
var path = require('path');
var sas = require('sas');
var mkdirp = require('mkdirp');
function build(srcPath, callback){
  srcPath = path.resolve(srcPath);
  var obj = path.parse(srcPath);

  var baseName = path.basename(obj.dir);

  var source = fs.readFileSync(srcPath, 'utf-8');
  var wraped = distWrap(source);
  var distDir = path.join(obj.dir, 'dist');
  var distPath = path.join(distDir, baseName + '.js');
  var distMinPath = path.join(distDir, baseName + '-min.js');
  console.log('distPath', distPath)
  console.log('distMinPath', distMinPath)
  function writeDist(cb){
    fs.writeFile(distPath, wraped, cb);
  }
  function writeMinDist(cb){
    fs.writeFile(distMinPath, uglify.minify(wraped).code, cb);
  }
  mkdirp.sync(distDir);
  sas({
    writeDist,
    writeMinDist
  }, callback)
}
build('./index.js', function(){
  console.log(arguments);
})
module.exports = build;
