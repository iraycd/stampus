# Stampus

Stampus is [Compass](http://compass-style.org/) (started as a port) for
[Stylus](http://learnboost.github.com/stylus/). The goal is complete
transparency for mixin'd properties and native-feeling convenience classes.

This repo is mostly a proof of concept so I can share it with people. It's a
weekend hack that I expect to rename/rebase/delete the repo in the near future.

## Installation
This depends on [my fork](https://github.com/grayrest/stylus/tree/grayrest)
(note the branch) of stylus. You'll have to check that out and `npm link` it in
order to run it.

    cd ~/working/dir/css
    ln -sf ~/path/to/stampus/stampus.styl
    ln -sf ~/path/to/stampus/stampus

At least that's how I've been poking around with it.

## CSS3

With the syntax changes in Stylus 0.6, it's possible to write stylus code that
looks completely native. Stampus is my experiment to see if it works in
practice. It does, but there are some stylus language limits and bugs.

    @import stampus

    #transparent {
        display: box;
        box-pack: start;
        opacity: 0.6;
    }

Running `stylus < test.stylus` will output:

    #transparent {
      opacity: 0.6;
      display: -moz-box;
      display: -webkit-box;
      display: box;
      -moz-box-pack: start;
      -webkit-box-pack: start;
      -ms-box-pack: start;
      box-pack: start;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";
      filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=60);
    }

The appropriate vendor prefixes are added to properties/values, IE fallbacks
are added, and so on. The rules are mostly modeled after the equivalent Compass
modules.

## Utilities (extending CSS)

Stampus also adds additonal "properties" (mixins made to look like CSS props)
for common use cases:

    @import "stampus"

    body {
        reset: box-model text;
    }
    ul.nav {
        horizontal-list: default;
    }

Produces:
    body {
      margin: 0;
      padding: 0;
      border: 0;
    }
    ul.nav {
      margin: 0;
      padding: 0;
      border: 0;
      zoom: 1;
      overflow: hidden;
    }
    ul.nav li {
      white-space: nowrap;
      float: left;
      padding-left: 4px;
      padding-right: 4px;
      display: inline;
    }
    ul.nav li:first-child,
    ul.nav li.first {
      padding-left: 0;
    }

## Configuration

Most of the mixins in Stampus have configurable default values. You can
override these values gobally by setting them before importing stampus. Passing
in `default` to a stampus mixin will (doesn't everywhere yet) use the default
values (e.g. `$default-box-pack = end`). This can be useful for things like
transition properties. Additionally, vendor support (-moz, -webkit, -o, -ms)
can be enabled/disabled by setting the appropriate value. So
`$experimental-support-for-mozilla = false` will disable all -moz prefixes.
Finally, you can set `$legacy-support-for-ie` to `false` to disable IE support
(e.g. opacity filter).

## Caveats

The following CSS3 Properties are missing or have limited support:

 * linear-gradient/radial-gradient - These are values in background-image and
   need to split background-image into multiple pieces in order to cover the
   webkit+standard variants

 * box-shadow - Only one shadow is supported, need better arg parsing to pursue
   multiple shadows. Also, it might be possible to shim in an IE filter but I
   haven't tried.

 * text-shadow - Only multiple shadows need vendor prefixes, but parsing that
   out would also depends on better arg parsing

 * transition - The top level transition shorthand property is not implemented,
   again due to arg parsing

Utility is all around less tested and there are some relatively nasty bugs
preventing most of the mixins from working completely.
