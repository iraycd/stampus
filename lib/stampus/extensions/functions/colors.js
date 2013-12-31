var stylus = require('stylus')
  , nodes = stylus.nodes
  , hsla = require('stylus/lib/nodes/hsla')
  , utils = stylus.utils;


function mix(color1, color2, weight){
  if(0<=weight<=100){
      p = parseInt(weight) / 100;
      w = p * 2 - 1;

      a = color1.a - color2.a;

      w1 = (((w * a == -1) ? w : (w + a) / (1 + w * a)) + 1) / 2;
      w2 = 1 - w1;

      channels = [[color1.r,color2.r],[color1.g,color2.g],[color1.b,color2.b]];
      rgb = [];

      for (i=0;i<channels.length;i++){
        rgb.push(Math.floor(channels[i][0] * w1 + channels[i][1] * w2));
      }
      a1 = color1.a * p;
      a2 = color1.a * (1 - p);
      alpha = a1 + a2;

      return hsla.fromRGBA({r: rgb[0], g: rgb[1], b: rgb[2], a: alpha});
  }
}


function clampPercentage(n) {
  return Math.max(0, Math.min(n, 100));
}
function adjust_color_value(value, amount){
   return clampPercentage(value + value * (amount / 100));
}
function scale_color_value(value, amount){
    if (amount > 0){
      value += (100 - value) * (amount / 100.0);
    }else if(amount < 0){
      value += value * amount / 100.0;
    }
    return value;
}


exports.adjust_lightness  = function(color, percent){
    color = hsla.fromRGBA(color);
    color.l = adjust_color_value(color.l, percent);
    return color;
};

exports.scale_lightness = function(color, percent){
    color = hsla.fromRGBA(color);
    color.l = scale_color_value(color.l,percent);
    return color;
};

exports.adjust_saturation = function(color, percent){
    color = hsla.fromRGBA(color);
    color.s = adjust_color_value(color.s, percent);
    return color;
};

exports.scale_saturation = function(color, percent){
    color = hsla.fromRGBA(color);
    color.s = scale_color_value(color.s,percent);
    return color;
};


exports.shade = function(color, percentage){
    black = {r: 0, g: 0, b: 0, a: 1};
    return mix(black, color, percentage);
}


exports.tint = function(color, percentage){
    white = {r: 255, g: 255, b: 255, a: 1};
    return mix(white, color, percentage);
}