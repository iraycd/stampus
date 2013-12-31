'use strict'


var mainProject = __dirname + '/frameworks/stampus/stylesheets';
var styl = mainProject+'/stampus.styl';
var functions =  './lib/stampus/extensions/functions';

var stylus = require('stylus')
    , str = require('fs').readFileSync(styl, 'utf8');

var paths = [
    __dirname
  , mainProject
];

var colors = require(functions+'/colors');
var color = function(style){
  style.define('adjust_lightness', colors.adjust_lightness);
  style.define('adjust_saturation', colors.adjust_saturation);
  style.define('scale_lightness', colors.scale_lightness);
  style.define('scale_saturation', colors.scale_saturation);
  style.define('shade', colors.shade);
  style.define('tint', colors.tint);
};

var font_files = require(functions+'/font_files');
var font_file = function(style){
  style.define('font_files',font_files.font_files);
};

stylus(str)
  .set('filename', styl)
  .set('paths', paths)
  .include(functions)
  .use(color)
  .use(font_file)
  .render(function(err, css){
    if (err) throw err;
    console.log(css);
  });

