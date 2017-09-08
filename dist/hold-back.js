(function(){
//dist-wrap top

  var fs = require('fs');
  var distWrap = require('dist-wrap');
  var uglify = require('uglify-js');
  var path = require('path');
  var sas = require('sas');
  function build(srcPath, callback){
    srcPath = path.resolve(srcPath);
    var source = fs.readFileSync(srcPath, 'utf-8');
    var wraped = distWrap(source);
    function writeDist(cb){
      fs.writeFile('./dist/hold-back.js', wraped, cb);
    }
    function writeMinDist(cb){
      fs.writeFile('./dist/hold-back-min.js', uglify.minify(wraped).code, cb);
    }
    sas({
      writeDist,
      writeMinDist
    }, callback)
  
  }
  build('./index.js', function(){
    console.log('arguments');
  })
  //module.exports = build;
  

//dist-wrap bottom
  if(typeof define === 'function' && define.amd) {
    define(function() {
      return build;
    });
  }else{
    this.build = build;
  }
})();