# gt-grunt

<img align="right" width="94" src="https://github.com/gthendean/gt-grunt/blob/master/grunt.jpg" title="Grunt - Courtesy of 5log.jp">

> Experimenting with Grunt

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may play with this Grunt project.

## Details on Gruntfile.js

Custom tasks include: default, serve, test, build and deploy._
To be implemented task: test._

Invoking task using the following command:
```shell
grunt [default | serve | test | build | deploy]
```

### Custom Tasks

#### "default"
Used at a certain development milestone to restart the web server and perform: jshint, test & serve. 

#### "serve"
Only start the web server

#### "build" task


```js
'shell:bower',
'newer:jshint',
'clean:dist',
'wiredep',
'concurrent:copyStylesImagemin',
'autoprefixer',
'useminPrepare',
'concat:generated',
'ngmin',
'cssmin:generated',
'uglify:generated',
'copy:dist',
'cdnify',
'filerev',
'usemin',
'htmlmin'
```