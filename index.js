var fs = require('fs');
var distWrap = require('dist-wrap');
var uglify = require('uglify-js');
var path = require('path');
var sas = require('sas');
function build(srcPath, callback){
  srcPath = path.resolve(srcPath);
  var obj = path.parse(srcPath);

  var baseName = obj.name;

  var source = fs.readFileSync(srcPath, 'utf-8');
  var wraped = distWrap(source);
  var distPath = path.join(obj.dir, 'dist/' + baseName + '.js');
  var distMinPath = path.join(obj.dir, 'dist/' + baseName + '-min.js');
  function writeDist(cb){
    fs.writeFile(distPath, wraped, cb);
  }
  function writeMinDist(cb){
    fs.writeFile(distMinPath, uglify.minify(wraped).code, cb);
  }
  sas({
    writeDist,
    writeMinDist
  }, callback)
}
// build('./index.js', function(err){
//   if(err){}
//   console.log('arguments');
// })
module.exports = build;
