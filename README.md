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
Start the web server, and work in tandem with [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch) that will
watch for files change & trigger a live reload when files change. 

#### "test"
Run the unit and e2e tests using Karma.

#### "build" task
Run this task to build the final artifacts and store them on the "dist" folder.
The built artifacts can be manually verified on the local web server before deployment using the following:
```shell
grunt serve:build
```

#### "deploy" task
Deploying the files in "dist" folder to the deployment repository on Github.
Cloud web server, like Azure website, can be linked to the Github repository to pull deployment artifacts.
Also, whenever the repository is updated, Azure website will also be redeployed.

### Tasks

#### "shell" - [grunt-shell](https://github.com/sindresorhus/grunt-shell)
Invoking shell commands, such as `bower install`.

#### "newer:jshint" - [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
Validate Javascript files with [JSHint](http://wwww.jshint.com).
See the [JSHint documentation](http://www.jshint.com/docs/) for a list of supported options._

[grunt-newer](https://github.com/tschaub/grunt-newer) is used in conjunction with other task that needs to run with newer files only.

#### "wiredep" - [grunt-wiredep](https://github.com/stephenplusplus/grunt-wiredep)
Inject Bower package artifacts into the specified source code file. For example, the file specifies css injection:
```shell
<!-- bower:css -->
<!-- endbower -->
```

```shell
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