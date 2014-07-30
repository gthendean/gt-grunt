# gt-grunt

<img align="right" width="94" src="https://github.com/gthendean/gt-grunt/blob/master/grunt.jpg" title="Grunt - Courtesy of 5log.jp">

> Experimenting with Grunt

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide,
as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.
Once you're familiar with that process, you may play with this Grunt project.

## Details on Gruntfile.js

Custom tasks include: default, serve, test, build and deploy.

Invoking task using the following command:
```shell
grunt [default | serve | tests | unit-tests | e2e-tests | build | deploy]
```

### Custom Tasks

#### "default"
Used at a certain development milestone to restart the web server and perform: jshint, test & serve. 

#### "serve"
Start the web server, and work in tandem with [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch) that will
watch for files change & trigger a live reload when files change. 

#### "tests", "unit-tests", "e2e-tests"
Run the unit and e2e tests.
Unit tests focus on testing small isolated parts of the application.
The unit tests are kept in the `test/unit` directory.
The project is configured to use [Karma](https://github.com/karma-runner/karma) to run the unit tests.

For `tests` task, the unit tests are run once, and the E2E tests continue even when there is fail test(s);

For `unit-tests` task, the server stays on, and unit tests are automatically re-executed whenever the Javascript files change.

For `e2e-tests` task, when e2e tests stop when encounter a fail test.

E2E tests ensure that the application as a whole operates as expected.
They are designed to test the whole client side application,
in particular that the views are displaying and behaving correctly.
It does this by simulating real user interaction with the real application running in the browser.
The E2E tests are kept in the `test/e2e` directory.

The project is configured to use [Protractor](https://github.com/angular/protractor) to run the E2E tests for the application.
Protractor relies upon a set of drivers to allow it to interact with the browser.
The drivers need to be installed (only once) before running the e2e tests. 
The script is included in the `node_modules\.bin` folder after installation of Protractor, and
it is integrated with `npm` and configured in the `package.json' file, as shown below.

```shell
"scripts": {
  "preupdate-webdriver": "npm install",
  "update-webdriver": "webdriver-manager update"
  // when behind corporate proxy
  //"update-webdriver": "webdriver-manager update --proxy=http://proxy:8080/"
}
```

Install the drivers by running
```shell
npm run update-webdriver
```

#### "build"
Run this task to build the final artifacts and store them on the "dist" folder.

The built artifacts can be manually verified on the local web server before deployment using the following:
```shell
grunt serve:build
```

#### "deploy"
Deploying the files in "dist" folder to the deployment repository on Github.
Cloud web server, like Azure website, can be linked to the Github repository to pull deployment artifacts.
Also, whenever the repository is updated, Azure website will also be redeployed.

### Tasks

#### "shell" - [grunt-shell](https://github.com/sindresorhus/grunt-shell)
Invoking shell commands, such as `bower install`.

#### "newer:jshint" - [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
Validate Javascript files with [JSHint](http://wwww.jshint.com).
See the [JSHint documentation](http://www.jshint.com/docs/) for a list of supported options.

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
Replacing refs to resources on the [Google CDN](https://developers.google.com/speed/libraries/devguide).

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

## Test
See `karma.conf.js`.

#### "karma" - [karma](https://github.com/karma-runner/karma)
A simple tool that allows you to execute JavaScript code in multiple real browsers.

#### "karma-jasmine" - [karma-jasmine](https://github.com/karma-runner/karma-jasmine)
Adapter for the Jasmine testing framework.

#### "karma-phantomjs-launcher" - [karma-phantomjs-launcher](https://github.com/karma-runner/karma-phantomjs-launcher)
Launcher for [PhantomJS](http://phantomjs.org/).

PhantomJS is a solution for: headless website testing, screen capture, page automation, and network monitoring.
