# gt-grunt

<img align="right" width="94" src="https://github.com/gthendean/gt-grunt/blob/master/grunt.jpg" title="Grunt - Courtesy of 5log.jp">

Experimenting with Grunt

## Details on Gruntfile.js

### "build" task

```css
  'shell:bower',
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