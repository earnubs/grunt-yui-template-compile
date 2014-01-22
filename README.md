[![Build Status](https://travis-ci.org/earnubs/grunt-yui-template-compile.png?branch=master)](https://travis-ci.org/earnubs/grunt-yui-template-compile)

# grunt-yui-template

> Precompile Y.Template files.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-yui-template --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-yui-template');
```

## The "yui_template" task

### Overview
In your project's Gruntfile, add a section named `yui_template` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  yui_template: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
        files: [{
            expand: true,
            src: 'src/**/js/templates/*.html',
            ext: '.js'
        }]
    },
  }
});
```

### Usage Examples

#### YUI like module directory structure

We store templates as .html files in js/templates, this grunt task simply precompiles them to .js files of the same name, it's the .js file which is referenced in build.json for Shifter to pick up and wrap as a module.

```js
grunt.initConfig({
  yui_template: {
    files: [{
        expand: true,
        src: 'src/**/js/templates/*.html',
        ext: '.js'
    }]
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
