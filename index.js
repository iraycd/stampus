'use strict'


var stylPath = './frameworks/stampus/stylesheets';
var stampusFile = stylPath +'/stampus.styl';
var functions =  './lib/stampus/extensions/functions';

var stylus = require('stylus')
    , str = require('fs').readFileSync(stampusFile, 'utf8');

var paths = [
    __dirname
  , stylPath
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
  .set('filename', stampusFile)
  .set('paths', paths)
  .include(functions)
  .use(color)
  .use(font_file)
  .render(function(err, css){
    if (err) throw err;
    console.log(css);
  });
