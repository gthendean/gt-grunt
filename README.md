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

#### "concurrent" - [grunt-concurrent](https://github.com/tschaub/grunt-gh-pages)
Running non-dependent tasks concurrently can potentially improve your build time significantly. 

#### "autoprefixer" - [grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer)
Parses CSS and adds vendor-prefixed CSS properties using the [Can I Use](http://caniuse.com/) database.

#### "usemin" - [grunt-usemin](https://github.com/yeoman/grunt-usemin)
Replaces the references of scripts, stylesheets and other assets within HTML files dynamically with optimized versions of them.
To do this usemin exports 2 built-in tasks called `useminPrepare` and `usemin`. Plugins used in optimizing files:
* [`concat`](https://github.com/gruntjs/grunt-contrib-concat) concatenates files (usually JS or CSS).
* [`uglify`](https://github.com/gruntjs/grunt-contrib-uglify) minifies JS files.
* [`cssmin`](https://github.com/gruntjs/grunt-contrib-cssmin) minifies CSS files.
* [`filerev`](https://github.com/yeoman/grunt-filerev) revisions static assets through a file content hash, for browser caching purposes.

#### "ngmin" - [grunt-ngmin](https://github.com/btford/grunt-ngmin)
Pre-minifying Angular apps.
*Depracated in favor of [ng-annotate](https://github.com/olov/ng-annotate)*

#### "copy" - [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy)
Copy files and folders.

#### "cdnify" - [grunt-google-cdn](https://github.com/btford/grunt-google-cdn)
Replacing refs to resources on the [Google CDN](https://developers.google.com/speed/libraries/devguide)._
For example, replacing the following:
```shell
<script src="bower_components/angular-route/angular-route.js"></script>
```
with
```shell
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-route.min.js"></script>
```

#### "htmlmin" - [grunt-contrib-htmlmin](https://github.com/gruntjs/grunt-contrib-htmlmin)
Minify HTML.

#### "gh-pages" - [grunt-gh-pages](https://github.com/tschaub/grunt-gh-pages)
Publish to GitHub Pages. The step includes: create a temporary clone of the current repository,
create a `gh-pages` branch if one doesn't already exist, 
copy over all files from the `dist` directory that match patterns from the `src` configuration,
commit all changes, and push to the `origin` remote.
