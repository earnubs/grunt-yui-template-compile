/*
 * grunt-yui-template
 * https://github.com/earnubs/grunt-yui-template
 *
 * Copyright (c) 2014 Stephen Stewart
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
    vow = require('vow'),
    htmlparser = require('htmlparser2'),
    Handlebars  = require('yui/handlebars').Handlebars,
    Micro = require('yui/template-micro').Template.Micro,

    FILE_EXTS = ['.hbs', '.mu', '.micro', '.handlebars'];

    function getExtension(filename) {
        var ext = (filename[0]||'').split('.');
        return ext[ext.length - 2];
    }


    /**
     * parse the file as html
     * @param {String} filepath
     **/
    function parseHTML(filepath, html, callback) {

        var promise = new vow.Promise(function(resolve, reject, notify) {
            var handler = new htmlparser.DomHandler(function(err, dom) {

                if (err) {
                    reject(err);
                }

                var ext = getExtension(filepath);
                resolve(parsedFileDomHandler(dom, ext));

            });

            var parser = new htmlparser.Parser(handler);

            parser.parseComplete(html);

        });


        return promise;

    }

    /**
     * handle the parsed dom
     * @param {Object} dom
     * @param {String} type Y.Template.Micro or Y.Template.Handlebars
     */
    function parsedFileDomHandler( dom, type ) {
        var i, l, node, html, namespace,

        output = '';

        for (i = 0, l = dom.length; i < l; i++ ) {
            node = dom[i];
            if ( node.type === 'script' ) {
                if (
                    ( node.attribs.type === 'x-template' ||
                     node.attribs.type === 'text/x-handlebars-template' ) &&
                         node.children &&
                             node.children[0].type === 'text'
                ) {
                    html = node.children[0].data;
                    namespace = node.attribs.id;

                    output += 'var engine, tmpl = ';

                    if (type && (type === 'hbs' || type === 'handlebars')) {
                        output += Handlebars.precompile(html) + ';\n';
                        output += 'engine = Y.Template.Handlebars;';
                    }

                    if (type && (type === 'mu' || type === 'micro')) {
                        output += Micro.precompile(html) + ';\n';
                        output += 'engine = Y.Template.Micro;';
                    }

                    output += '\nY.Template.register("'+namespace+'", engine.revive(tmpl));\n\n';

                } else {
                    console.log('<script> element empty or has irrelevant type attribute, skipping');
                }
            }
        }

        return output += '\n\n';
    }

module.exports = function(grunt) {

    grunt.registerMultiTask('yui_template', 'Precompile Y.Template files.', function() {

        //var done = this.async();

        this.files.forEach(function(f) {

            var src = f.src;
            var dest = f.dest;

            parseHTML(src, grunt.file.read(src)).
                then(function(result) {

                grunt.log.oklns(dest + ' precompiled OK!');
                grunt.file.write(dest, result);

            }, function(err) {
                grunt.log.error(err);
            });

        });

        //done();

    });

};
