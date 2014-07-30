'use strict';

module.exports = function(grunt) {

  // Load grunt tasks automatically, in lieu of manual like the following:
  //    grunt.loadNpmTasks('grunt-contrib-clean');
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  
  // General configurations based on: package.json & bower.json
  // Modify the 'deployrepo' to the target deployment repository
  var globalCfg = {
    pkg: grunt.file.readJSON('package.json'),
    bower: grunt.file.readJSON('bower.json'),
    src: require('./bower.json').appPath || 'app',
    dist: 'dist',
    deployrepo: 'https://github.com/gthendean/gt-grunt-deploy.git'
  };

  // Grunt configurations
  grunt.initConfig({
  
    // Make general configurations available to Grunt
    cfg: globalCfg,

    // **********************************************
    // Customize everything starting here           *
    // each entry in this JSON structure is a tasks *
    // **********************************************

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= cfg.src %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= cfg.src %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= cfg.src %>/{,*/}*.html',
          '<%= cfg.src %>/scripts/{,*/}*.js',
          '.tmp/styles/{,*/}*.css',
          '<%= cfg.src %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },    
    
    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(globalCfg.src)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          hostname: 'localhost',
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(globalCfg.src)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= cfg.dist %>'
        }
      }
    },
    
    // Mechanism to invoke shell command
    shell: {
      package: {
        command: 'npm install'
      },
      bower: {
        command: 'bower install'
      }
    },
    
    // Clean-up folder before re-build
    // Subtasks:
    //  - build: used in build, unit tests, and e2e tests
    //  - dist: used in final build for deployment
    // Foilders:
    //  - .tmp: used for temporary assembling
    //  - dist: used for assembling final artifacts
    // Notes:
    //  - The "dist" folder is to be pushed to Git for deployment using "gh-pages" task;
    //    therefore it contains ".git" file (not deleted)
    //  - files.dot means Allow patterns to match filenames starting with a period,
    //    even if the pattern does not explicitly have a period in that spot.
    //    See http://gruntjs.com/configuring-tasks - Files
    clean: {
      serve: {src: '.tmp'},
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp/{,*/}*',
            '.tmp',
            '<%= cfg.dist %>/{,*/}*',
            '!<%= cfg.dist %>/.git*'
          ]
        }]
      },
      nodeModules: {
        src: 'node_modules'
      }
    },

    // Copy files:
    // - copy styles to ".tmp" so that it can be cssmin
    copy: {
      styles: {
        files: [
          {
            expand: true,
            cwd: '<%= cfg.src %>/styles',
            dest: '.tmp/styles/',
            src: '{,*/}*.css'
          },
          {
            expand: true,
            cwd: '.',
            dest: '.tmp/',
            src: 'bower_components/bootstrap/dist/css/{,*/}*.css'
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= cfg.src %>',
            dest: '<%= cfg.dist %>',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              '*.html',
              'views/{,*/}*.html',
              'images/{,*/}*.{webp}',
              'fonts/*'
            ]
          },
          {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= cfg.dist %>/images',
            src: ['generated/*']
          },
          {
            expand: true,
            cwd: 'bower_components/bootstrap/dist',
            src: 'fonts/*',
            dest: '<%= cfg.dist %>'
          },
          {
            expand: true,
            dot: true,
            cwd: 'deploy',
            src: '**/*',
            dest: '<%= cfg.dist %>'
          }
        ]
      }
    },
    
    // Automatically inject Bower components artifacts into the app
    // The index.html specifies which artifacts to inject: css, js. etc.
    wiredep: {
      app: {
        src: ['<%= cfg.src %>/index.html'],
        ignorePath: new RegExp('^<%= cfg.src %>/|../')
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= cfg.src %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= cfg.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= cfg.src %>/images',
          src: '{,*/}*.svg',
          dest: '<%= cfg.dist %>/images'
        }]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/styles/',
            src: '{,*/}*.css',
            dest: '.tmp/styles/'
          },
          {
            expand: true,
            cwd: '.tmp/bower_components/',
            src: '{,*/}*.css',
            dest: 'bower_components/styles/'
          }
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    //  concat - dest=.tmp/concat
    //  uglify - src=.tmp/concat dest is specified below
    //  cssmin - src is specified in index.html, dest is specified below
    useminPrepare: {
      html: '<%= cfg.src %>/index.html',
      options: {
        root: '',
        dest: '<%= cfg.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= cfg.dist %>/{,*/}*.html'],
      css: ['<%= cfg.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= cfg.dist %>','<%= cfg.dist %>/images']
      }
    },

    // ngmin tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection. It doesn't work on
    // things like resolve or inject so those have to be done manually.
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },
    
    // Replace Google CDN references
    // TODO - Not very clear what the purpose of using this
    cdnify: {
      dist: {
        html: ['<%= cfg.dist %>/*.html']
      }
    },
    
    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= cfg.dist %>/scripts/{,*/}*.js',
          '<%= cfg.dist %>/styles/{,*/}*.css',
          '<%= cfg.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= cfg.dist %>/styles/fonts/*'
        ]
      }
    },
    
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= cfg.dist %>',
            src: ['*.html', 'views/{,*/}*.html'],
            dest: '<%= cfg.dist %>'
          }
        ]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      copyStyles: {
        tasks: ['copy:styles'],
        options: {logConcurrentOutput: true}
      },
      copyStylesImagemin: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },    
    
    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= cfg.src %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    'gh-pages': {
      options: {
        base: 'dist',
        repo: '<%= cfg.deployrepo %>',
        branch: 'master'
      },
      src: '**/*'
    },

    // Test settings; When singleRun is false, it will wait for file changes
    karma: {
      unitOnce: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      },
      unitWatch: {
        configFile: 'test/karma.conf.js',
        singleRun: false
      }
    },

    // E2E test using Protractor
    protractor: {
      options: {
        configFile: 'test/protractor-conf.js',
        keepAlive: false,  // If false, the grunt process stops when the test fails
        noColor: false,   // If true, protractor will not use colors in its output
      },
      e2eStopOnFail: {
        options: {
          keepAlive: false
        }
      },
      e2eContinueOnFail: {
        options: {
          keepAlive: true
        }
      }
    }
    
  });
  
  
  // Default task(s).
  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'serve'
  ]);

  grunt.registerTask('serve', 'Prepare, compile, then start connection to web server', function (target) {
    grunt.log.writeln(['>>> '+'Prepare, compile, then start connection to web server']);
    grunt.log.writeln(['>>> '+'Target: '+target]);
    
    if (target === 'build') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:serve',
      'wiredep',
      'concurrent:copyStyles',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);    
  });

  grunt.registerTask('tests', 'Prepare, compile, then running unit & e2e tests', function (target) {
    grunt.log.writeln(['>>> '+'Prepare, compile, then running unit & e2e tests']);
    grunt.log.writeln(['>>> '+'Target: '+target]);
    grunt.task.run([
      'clean:serve',
      'concurrent:copyStyles',
      'autoprefixer',
      'connect:test',
      'karma:unitOnce',
      'protractor:e2eContinueOnFail'
    ]);
  });

  grunt.registerTask('unit-tests', 'Prepare, compile, then running unit & e2e tests', function (target) {
    grunt.log.writeln(['>>> '+'Prepare, compile, then running unit & e2e tests']);
    grunt.log.writeln(['>>> '+'Target: '+target]);
    grunt.task.run([
      'clean:serve',
      'concurrent:copyStyles',
      'autoprefixer',
      'connect:test',
      'karma:unitWatch'
    ]);
  });

  grunt.registerTask('e2e-tests', 'Prepare, compile, then running unit & e2e tests', function (target) {
    grunt.log.writeln(['>>> '+'Prepare, compile, then running unit & e2e tests']);
    grunt.log.writeln(['>>> '+'Target: '+target]);
    grunt.task.run([
      'clean:serve',
      'concurrent:copyStyles',
      'autoprefixer',
      'connect:test',
      'protractor:e2eStopOnFail'
    ]);
  });
  
  grunt.registerTask('build', 'Build only', function (target) {
    grunt.log.writeln(['>>> '+'Build only']);
    grunt.log.writeln(['>>> '+'Target: '+target]);
    grunt.task.run([
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
    ]);
  });

  grunt.registerTask('deploy', 'Build and deploy', function (target) {
    // Command: grunt deploy:"custom message for Git commit"
    grunt.log.writeln(['>>> '+'Build and deploy']);
    grunt.log.writeln(['>>> '+'Target: '+target]);
    if (target) {
      grunt.config.set(['gh-pages', 'options', 'message'], target);
    }
    grunt.task.run([
      'build',
      'gh-pages'
    ]);
  });
  
};