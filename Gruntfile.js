module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    grunt.loadNpmTasks('grunt-karma');

    var debugJs = false;

    grunt.config.init({
        basic: {
            src: 'src/main/static',
            test: 'src/test',
            gen: 'target/generated-sources',
            genJsRaw: 'target/generated-sources/temp/javascript',
            genJs: 'target/generated-sources/javascript',
            testGen: 'target/generated-test-sources',
            dist: 'src/main/webapp/static'
        },
        yeoman: {
            project: 'supportrun-thundr',
            port: 8080
        },
        extensions: {
            // file extensions for different asset types
            images: '{png,jpg,jpeg,gif,webp,svg}',
            fonts: '{css,eot,svg,ttf,woff,woff2,otf,gif,png,jpg,jpeg}'
        },
        srcs: {
            // source location for different asset types
            css: '<%= basic.src %>/css/',
            docs: '<%= basic.src %>/docs/',
            fonts: '<%= basic.src %>/fonts/',
            images: '<%= basic.src %>/images/',
            ts: '<%= basic.src %>/typescript/',
            less: '<%= basic.src %>/less/styles/',
            templates: '<%= basic.src %>/templates/',
            testTs: '<%= basic.test %>/typescript/'
        },
        karma: {
            options: {
                configFile: 'karma.conf.js',
                singleRun: true
            },
            singleRun: {},
            debug: {
                browsers: ['Chrome']
            }
        },
        clean: { // Clean generated assets - basically purges src/main/webapp/static
            static: {src: '<%= basic.dist %>', dot: true},
            bower: {src: 'bower_components', dot: true},
            generated: {src: '<%= basic.gen %>', dot: true},
            testGenerated: {src: '<%= basic.testGen %>', dot: true}
        },
        copy: { // Copy assets from src/main/static to /src/main/webapp/static
            css: {cwd: '<%= srcs.css %>', src: '{,*/}*.css', dest: '<%= basic.dist %>/css/', expand: true},
            docs: {cwd: '<%= srcs.docs %>', src: '{,*/}*.pdf', dest: '<%= basic.dist %>/docs/', expand: true},
            fonts: {cwd: '<%= srcs.fonts %>', src: '{,*/}*.<%= extensions.fonts %>', dest: '<%= basic.dist %>/fonts/', expand: true},
            images: {cwd: '<%= srcs.images %>', src: '**/*.<%= extensions.images %>', dest: '<%= basic.dist %>/images/', expand: true},
            templates: {cwd: '<%= srcs.templates %>', src: '**/*.html', dest: '<%= basic.dist %>/templates/', expand: true},
            bower: {cwd: '<%= basic.gen %>/lib', src: ['**/*.<%= extensions.fonts %>'], dest: '<%= basic.dist %>/lib', expand: true}
        },
        "goog-webfont-dl": {
            roboto: {
                options: {
                    ttf: true, eot: false, woff: false, woff2: false, svg: false,
                    fontname: 'Roboto',
                    fontstyles: '100,300',
                    fontdest: '<%= basic.dist %>/fonts/',
                    cssdest: '<%= basic.dist %>/fonts/fonts-roboto.css'
                }
            }
        },
        less: { // Compiles Less files in src/main/static/less/styles into src/main/webapp/static
            generate: {
                options: {compress: true, cleancss: true},
                files: [{cwd: '<%= basic.src %>', src: ['less/styles/**/*.less'], dest: '<%= basic.dist %>/styles/', ext: '.css', flatten: true, expand: true}]
            }
        },
        postcss: {
            options: {
                map: {
                    inline: false,
                    annotation: '<%= basic.dist %>/styles/'
                },
                processors: [
                    // require('autoprefixer')({browsers: '> 0.5%, last 2 versions'}), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            css: {
                cwd: '<%= basic.gen %>',
                src: ['styles/**/*.css'],
                dest: '<%= basic.dist %>/',
                expand: true
            }
        },
        favicons: { // Generate favicons from one single original favicon file.
            // REQUIRES IMAGE MAGIC - installation instructions here: https://github.com/gleero/grunt-favicons
            options: {
                html: 'src/main/webapp/WEB-INF/tags/meta-favicons.html',
                HTMLPrefix: "/static/images/favicon/"
            },
            generate: {
                src: '<%= srcs.images %>/favicon/original.png',
                dest: '<%= basic.dist %>/images/favicon'
            },
        },
        tslint: {
            options: {
                configuration: "tslint.json",
                force: false
            },
            files: {
                src: ['<%= srcs.ts %>/**/*.ts']
            }
        },
        typescript: { // compile typescript - generates files into target/generated-sources/temp/javascript
            base: {
                src: ['<%= srcs.ts %>/**/*.ts'],
                dest: '<%= basic.genJsRaw %>',
                options: {
                    module: 'amd',
                    target: 'es5',
                    sourceMap: true,
                    declaration: true
                }
            },
            test: {
                src: ['<%= srcs.testTs %>/**/*.ts'],
                dest: '<%= basic.testGen %>/javascript',
                options: {
                    module: 'amd',
                    target: 'es5',
                    declaration: true,
                    references: [
                        'typings/index.d.ts',
                        '<%= basic.genJsRaw %>/**/*.d.ts'
                    ]
                }
            }
        },
        ngAnnotate: { // Automatically add angular annotation for angular DI - Generates files from target/generated-sources/temp/javascript into target/generated-sources/javascript
            js: {
                files: [{
                    cwd: '<%= basic.genJsRaw %>',
                    src: ['**/*.js'],
                    dest: '<%= basic.genJs %>',
                    expand: true
                }]
            }
        },
        concat: { // Concatenates application javascript into one uber file
            js: {
                src: ['<%= basic.gen %>/javascript/app.js', '<%= basic.gen %>/javascript/**/*.js', "!<%= basic.gen %>/javascript/application.js"],
                dest: '<%= basic.gen %>/javascript/application.js'
            },
        },
        uglify: { // Uglify javascript from target/generated-sources/javascript into src/main/static/javascript
            js: {
                files: [{
                    cwd: '<%= basic.genJs %>',
                    src: ['**/*.js'],
                    dest: '<%= basic.dist %>/javascript',
                    expand: true
                }]
            },
            options: {
                beautify: debugJs,
                sourceMap: true,
                sourceMapIncludeSources: true,
                mangle: debugJs ? false : {},
                compress: debugJs ? false : {},
                wrap: true
            }
        },
        bower: { // Install your bower dependencies to src/main/static/lib
            copy: {
                options: {
                    targetDir: '<%= basic.dist %>/lib',
                    layout: function (type, component, source) {
                        // We maintain the original bower layout, but only include main files
                        var tokens = source.split("/");
                        var end = tokens.length < 3 ? tokens.length : tokens.length - 1;
                        return tokens.slice(1, end).join("/");
                    }
                }
            }
        },
        typings: {
            install: {}
        },
        cssmin: { // minify bower resources
            bower: {
                files: [{
                    expand: true,
                    cwd: '<%= basic.gen %>/lib',
                    src: ['*/*.css', '*/*/*.css'],
                    dest: '<%= basic.dist %>/lib',
                    ext: '.css'
                }]
            },
            options: {
                //debug: true,
                rebase: false,
                processImport: false
            }
        },
        injector: { // auto inject application files into page layout
            css: {
                options: {
                    relative: false,
                    destFile: 'src/main/webapp/WEB-INF/tags/generated-css.html',
                    ignorePath: 'src/main/webapp'
                },
                files: [
                    {   // Fonts
                        expand: true,
                        cwd: '<%= basic.dist %>/fonts/',
                        src: ['**/*.css']
                    },
                    {   // Application styles
                        expand: true,
                        cwd: '<%= basic.dist %>/styles/',
                        src: ['**/*.css']
                    }
                ]
            },
            js: {
                options: {
                    relative: false,
                    destFile: 'src/main/webapp/WEB-INF/tags/generated-js.html',
                    ignorePath: 'src/main/webapp'
                },
                files: [
                    {   // Application javascript
                        expand: true,
                        cwd: '<%= basic.dist %>/javascript/',
                        src: debugJs ? ['**/*.js', '!application.js'] : ['application.js']
                    }
                ]
            }
        },
        wiredep: { // auto inject bower files into page layout (in dependency order
            bowerResources: {
                src: ['src/main/webapp/WEB-INF/tags/generated-css.html', 'src/main/webapp/WEB-INF/tags/generated-js.html'],
                options: {
                    ignorePath: "../../../../../bower_components/",
                    fileTypes: {
                        html: {
                            block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                            detect: {
                                js: /<script.*src=['"]([^'"]+)/gi,
                                css: /<link.*href=['"]([^'"]+)/gi
                            },
                            replace: {
                                js: '<script src="/static/lib/{{filePath}}"></script>',
                                css: '<link rel="stylesheet" href="/static/lib/{{filePath}}" />'
                            }
                        }
                    },
                    exclude: [/bootstrap.css/]
                }
            },
            test: {
                src: './karma.conf.js',
                devDependencies: true,
                exclude: [/bootstrap.css/]
            }
        },
        cacheBust: {
            options: {
                rename: false
            },
            assets: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/main/webapp/WEB-INF/tags/',
                        src: ['generated-css.html', 'generated-js.html'],
                        baseDir: "<%= basic.dist %>/../"
                    }
                ]
            }
        },

        /**
         * Watch for changes to the asset groups and re-process as necessary.
         */
        watch: {
            gruntfile: {tasks: ['build'], files: ['Gruntfile.js']},
            bower: {tasks: ['process-bower', 'process-layout'], files: ['bower.json']},
            css: {tasks: ['process-css'], files: ['<%= basic.src %>/css/**/*.css']},
            favicon: {tasks: ['process-favicon'], files: ['<%= basic.src %>/images/favicon/*.<%= extensions.images %>']},
            fonts: {tasks: ['process-fonts'], files: ['<%= basic.src %>/fonts/**/*.<%= extensions.fonts %>']},
            images: {tasks: ['process-images'], files: ['<%= basic.src %>/images/**/*.<%= extensions.images %>']},
            js: {tasks: ['process-js', 'process-layout'], files: ['<%= basic.src %>/typescript/**/*.ts']},
            less: {tasks: ['process-css', 'process-layout'], files: ['<%= basic.src %>/less/**/*.less']},
            layout: {tasks: ['process-layout'], files: ['src/main/webapp/WEB-INF/tags/layout.tag']},
            templates: {tasks: ['process-templates'], files: ['<%= basic.src %>/templates/**/*.html']}
        },

        connect: {
            options: {
                port: '<%= yeoman.port %>',
                hostname: '0.0.0.0',
                protocol: 'http'
            },
            proxies: [{
                context: ['/', '!/static'],
                host: 'localhost',
                port: '<%= yeoman.port + 1 %>'
            }],
            server: {
                options: {
                    host: 'localhost',
                    port: '<%= yeoman.port %>',
                    base: 'src/main/webapp',
                    logger: 'dev',
                    middleware: function (connect, options) {
                        var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                        return [
                            proxy, // Include the proxy first
                            connect.static(options.base), // Serve static files.
                            connect.directory(options.base) // Make empty directories browsable.
                        ];
                    }
                },
                proxies: [{
                    context: ['/', '!/static'],
                    host: 'localhost',
                    port: '<%= yeoman.port + 1 %>'
                }]
            }
        }
    });

    grunt.registerTask('default', [
        'build',
        'configureProxies',
        'connect:server',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:static',
        'create-generated-files',
        'process-bower',
        'typings',
        'process-favicons',
        'process-templates',
        'process-images',
        'process-fonts',
        'process-css',
        'process-js',
        'process-layout',
        'copy:docs'
    ]);

    grunt.registerTask('test', [
        'prepare-test',
        'karma:singleRun'
    ]);

    grunt.registerTask('testWatch', [
        'prepare-test',
        'karma:singleRun',
        'watchForTest'
    ]);

    grunt.registerTask('testDebug', [
        'prepare-test',
        'karma:debug'
    ]);

    grunt.registerTask('prepare-test', [
        'bower',
        'typings',
        'typescript',
        'wiredep:test'
    ]);

    grunt.registerTask('process-favicons', [
        'favicons'
    ]);

    grunt.registerTask('process-js', [
        'process-js-minimal',
        'ngAnnotate:js',
        'concat:js',
        'uglify:js'
    ]);

    grunt.registerTask('process-js-minimal', [
        'tslint',
        'typescript:base'
    ]);

    // Extract main files, copy non-js resources, minify js resources
    grunt.registerTask('process-bower', [
        'bower',
        'cssmin:bower',
        'copy:bower'
    ]);

    grunt.registerTask('process-css', [
        'copy:css',
        'less',
        'postcss'
    ]);

    grunt.registerTask('process-fonts', [
        'copy:fonts',
        'goog-webfont-dl'
    ]);

    grunt.registerTask('process-templates', [
        'copy:templates'
    ]);
    grunt.registerTask('process-layout', [
        'injector',
        'wiredep:bowerResources',
        'cacheBust'
    ]);

    grunt.registerTask('process-images', [
        'copy:images'
    ]);

    grunt.registerTask('create-generated-files', function () {
        grunt.file.write('src/main/webapp/WEB-INF/tags/generated-css.html', '<!-- bower:css -->\n<!-- endbower -->\n<!-- injector:css -->\n<!-- endinjector -->');
        grunt.file.write('src/main/webapp/WEB-INF/tags/generated-js.html', '<!-- bower:js -->\n<!-- endbower -->\n<!-- injector:js -->\n<!-- endinjector -->');
    });

    // Had to register another dynamic task to watch typescript files specifically for tests.
    // If there are other, more elegant solutions that run quickly then we can consider swapping out (e.g. https://github.com/sergeyt/karma-typescript-preprocessor)
    grunt.registerTask('watchForTest', function () {
        // Configuration for watch:test tasks.
        var config = {
            grunt: {files: ['Gruntfile.js']},
            js: {tasks: ['process-js-minimal', 'test'], files: ['<%= basic.src %>/typescript/**/*.ts']},
            testJs: {tasks: ['test'], files: ['<%= basic.test %>/typescript/**/*.ts']},
            karma: {tasks: ['test'], files: [' <%= karma.options.configFile %>']}
        };

        grunt.config('watch', config);
        grunt.task.run('watch');
    });
};
