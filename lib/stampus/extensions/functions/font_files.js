var stylus = require('stylus')
  , nodes = stylus.nodes
  , utils = stylus.utils;

 FONT_TYPES = {
    woff : 'woff',
    otf : 'opentype',
    opentype : 'opentype',
    ttf : 'truetype',
    truetype : 'truetype',
    svg : 'svg',
    eot : 'embedded-opentype'
}


exports.font_files = function(){
    var files = [],
        args_length = arguments.length,
        skip_next = false
    for(i=0;i<args_length;i++){
        if(skip_next){
            skip_next = false;
        }
        var type = (args_length > i +1)? arguments[i+1] : false;

        if (FONT_TYPES.hasOwnProperty(type)){
            skip_next = true;
        }else{
            type = arguments[i].toString().split('.').pop().replace(/(\?(.*))?(#(.*))?"/, '');
        }

        if (FONT_TYPES.hasOwnProperty(type)){
            files.push("url('"+arguments[i]+"') " + "format('"+FONT_TYPES[type]+"')");
        }else{
            throw new Error("Could not determine font type for #"+arguments[i])
        }
    }
    return files.join(", ");
}