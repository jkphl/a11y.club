/* global module:false */
module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    var mozjpeg = require('imagemin-mozjpeg');

    grunt.initConfig({
        sass: {
            above: {
                files: [{
                    expand: true,
                    cwd: '.src/sass/above',
                    src: ['**/*.scss'],
                    dest: '.src/css/above',
                    rename: function (dest, src) {
                        var folder = src.substring(0, src.lastIndexOf('/')),
                            filename = src.substring(src.lastIndexOf('/'), src.length);
                        filename = filename.substring(0, filename.lastIndexOf('.'));
                        return dest + '/' + folder + filename + '.css';
                    }
                }],
                options: {
                    sourcemap: true,
                    style: 'nested'
                }
            },
            below: {
                files: [{
                    expand: true,
                    cwd: '.src/sass/below',
                    src: ['**/*.scss'],
                    dest: '.src/css/below',
                    rename: function (dest, src) {
                        var folder = src.substring(0, src.lastIndexOf('/')),
                            filename = src.substring(src.lastIndexOf('/'), src.length);
                        filename = filename.substring(0, filename.lastIndexOf('.'));
                        return dest + '/' + folder + filename + '.css';
                    }
                }],
                options: {
                    sourcemap: true,
                    style: 'nested'
                }
            },
            noconcat: {
                files: [{
                    expand: true,
                    cwd: '.src/sass/noconcat',
                    src: ['**/*.scss'],
                    dest: '.src/css/noconcat',
                    rename: function (dest, src) {
                        var folder = src.substring(0, src.lastIndexOf('/')),
                            filename = src.substring(src.lastIndexOf('/'), src.length);
                        filename = filename.substring(0, filename.lastIndexOf('.'));
                        return dest + '/' + folder + filename + '.css';
                    }
                }],
                options: {
                    sourcemap: true,
                    style: 'nested'
                }
            },
            slides: {
                files: [{
                    expand: true,
                    cwd: '.src/slides/sass',
                    src: ['**/*.scss'],
                    dest: '.src/slides/css',
                    rename: function (dest, src) {
                        var folder = src.substring(0, src.lastIndexOf('/')),
                            filename = src.substring(src.lastIndexOf('/'), src.length);
                        filename = filename.substring(0, filename.lastIndexOf('.'));
                        return dest + '/' + folder + filename + '.css';
                    }
                }],
                options: {
                    sourcemap: true,
                    style: 'nested'
                }
            }
        },

        iconizr: {
            dist: {
                src: ['**/*.svg'],
                dest: 'css',
                expand: true,
                cwd: '.src/icons',
                options: {
                    log: 'debug',
                    shape: {
						dest	: 'icons',
                        transform: [
                            { svgo: { plugins: [{ convertPathData: false }] } }
                        ],
                        dimensions: {
                            maxWidth: 300
                        }
                    },
                    icons: {
                        dest: '.',
                        prefix: '.icons-%s',
//						mixin			: 'icon',
//						common			: 'icon',
                        dimensions: '-dims',
                        layout: 'vertical',
                        sprite: 'icons/icons.svg',
                        render: {
                            scss: {
                                dest: '../.src/sass/noconcat/icons'
                            }
                        },
                        bust: true,
                        preview: 'icons/preview',
                        loader: {
                            dest: 'icons-loader-fragment.html',
                            css: 'icons.%s.min.css'
                        }
                    }
                }
            }
        },

        favicons: {
            options: {
                html: 'favicons/favicons.html',
                HTMLPrefix: '/favicons/',
                precomposed: false,
                firefox: true,
                firefoxManifest: 'favicons/a11y.webapp',
                appleTouchBackgroundColor: '#222222'
            },
            icons: {
                src: '.src/favicon/favicon.png',
                dest: 'favicons'
            }
        },


        copy: {
            favicon: {
                src: 'favicons/favicon.ico',
                dest: 'favicon.ico'
            }
        },

        replace: {
            favicon: {
                src: ['favicons/favicons.html'],
                overwrite: true,
                replacements: [{
                    from: /[\t\r\n]+/g,
                    to: ''
                }, {
                    from: /<link rel="shortcut icon".*/g,
                    to: '<link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/><link rel="icon" href="favicon.ico" type="image/x-icon"/>'
                }]
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 3 versions', 'ie 8']
            },
            general: {
                src: ['css/a11y.css']
            },
            above: {
                src: ['css/a11y-above.css']
            },
            below: {
                src: ['css/a11y-below.css']
            },
            noconcat: {
                expand: true,
                flatten: true,
                src: '.src/css/noconcat/*.css',
                dest: 'css/'
            },
            slides: {
                expand: true,
                flatten: true,
                src: '.src/slides/css/*.css',
                dest: '.src/slides/css/'
            }
        },

        cssmin: {
            general: {
                files: {
                    'css/a11y.min.css': ['css/a11y.css']
                }
            },
            above: {
                files: {
                    'css/a11y-above.min.css': ['css/a11y-above.css']
                }
            },
            below: {
                files: {
                    'css/a11y-below.min.css': ['css/a11y-below.css']
                }
            },
            noconcat: {
                expand: true,
                cwd: 'css/',
                src: ['*.css', '!*.min.css', '!a11y.css', '!a11y-above.css', '!a11y-below.css'],
                dest: 'css/',
                //ext				: '.min.css',
                rename: function (dest, src) {
                    var folder = src.substring(0, src.lastIndexOf('/')),
                        filename = src.substring(src.lastIndexOf('/'), src.length);
                    filename = filename.substring(0, filename.lastIndexOf('.'));
                    return dest + '/' + folder + filename + '.min.css';
                }
            },
            slides: {
                expand: true,
                cwd: '.src/slides/css/',
                src: ['*.css', '!*.min.css'],
                dest: '.src/slides/css/',
                ext: '.min.css'
            }
        },

        concat: {
            general: {
                src: ['.src/css/*.css'],
                dest: 'css/a11y.css'
            },
            above: {
                src: ['.src/css/above/*.css'],
                dest: 'css/a11y-above.css'
            },
            below: {
                src: ['.src/css/below/*.css'],
                dest: 'css/a11y-below.css'
            },
            javascript: {
                src: ['.src/js/*.js'],
                dest: 'js/a11y.js'
            }
        },

        uglify: {
            web: {
                expand: true,
                cwd: 'js',
                src: ['*.js', '!*.min.js'],
                dest: 'js',
                ext: '.min.js'
            },
            slides: {
                files: {
                    'archive/20180115/js/a11yclub-slides.min.js': ['.src/slides/js/actions.js', '.src/slides/js/slider.js']
                }
            }
        },

        clean: {
            general: ['css/a11y.css', 'css/a11y.min.css'],
            above: ['css/a11y-above.css', 'css/a11y-above.min.css'],
            below: ['css/a11y-below.css', 'css/a11y-below.min.css'],
            slides: ['.src/slides/css/a11yclub-slides.css', '.src/slides/css/a11yclub-slides.min.css', '.src/slides/css/a11yclub-slides-print.css', '.src/slides/css/a11yclub-slides-print.min.css'],
            favicon: ['favicon.ico']
        },

        imagemin: {
            web: {
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [mozjpeg()]
                },
                files: [{
                    expand: true,
                    cwd: '.src/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            },
            slides: {
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [mozjpeg()]
                },
                files: [{
                    expand: true,
                    cwd: '.src/slides/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'archive/20180115/img/'
                }]
            }
        },

        'string-replace': {
            web: {
                files: {
                    'index.html': '.src/html/index.html',
                    'code-of-conduct.html': '.src/html/code-of-conduct.html',
                    'privacy-policy.html': '.src/html/privacy-policy.html',
                },
                options: {
                    replacements: [
                        {
                            pattern: '<link rel="stylesheet" type="text/css" href="css/a11y-above.min.css" media="all"/>',
                            replacement: '<style><%= grunt.file.read("css/a11y-above.min.css") %></style>'
                        },
                        {
                            pattern: '<!-- iconizr -->',
                            replacement: '<%= grunt.file.read("css/icons-loader-fragment.html") %>'
                        }
                    ]
                }
            },
            slides: {
                files: {
                    'archive/20180115/index.html': '.src/slides/html/index.html',
                },
                options: {
                    replacements: [
                        {
                            pattern: '<link media="all" href="a11yclub-slides.css" rel="stylesheet"/>',
                            replacement: '<style media="all"><%= grunt.file.read(".src/slides/css/a11yclub-slides.min.css") %></style>'
                        },
                        {
                            pattern: '<link media="print" href="a11yclub-slides-print.css" rel="stylesheet"/>',
                            replacement: '<style media="print"><%= grunt.file.read(".src/slides/css/a11yclub-slides-print.min.css") %></style>'
                        },
                        {
                            pattern: '<!-- favicon -->',
                            replacement: '<%= grunt.file.read("favicons/favicons.html") %>'
                        }
                    ]
                }
            }
        },

        htmlmin: {
            web: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'index.html': 'index.html',
                    'code-of-conduct.html': 'code-of-conduct.html',
                    'privacy-policy.html': 'privacy-policy.html',
                }
            },
            slides: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'archive/20180115/index.html': 'archive/20180115/index.html',
                }
            },
        },

        watch: {
            // Watch Sass resource changes
            sassAbove: {
                files: '.src/sass/above/**/*.scss',
                tasks: ['sass:above']
            },
            sassBelow: {
                files: '.src/sass/below/**/*.scss',
                tasks: ['sass:below']
            },
            sassNoconcat: {
                files: '.src/sass/noconcat/**/*.scss',
                tasks: ['sass:noconcat']
            },
            sassSlides: {
                files: '.src/slides/sass/**/*.scss',
                tasks: ['css-slides']
            },

            // Watch changing CSS resources
            cssGeneral: {
                files: ['.src/css/*.css'],
                tasks: ['clean:general', 'concat:general', 'autoprefixer:general', 'cssmin:general'],
                options: {
                    spawn: true
                }
            },
            cssAbove: {
                files: ['.src/css/above/*.css'],
                tasks: ['clean:above', 'concat:above', 'autoprefixer:above', 'cssmin:above'],
                options: {
                    spawn: true
                }
            },
            cssBelow: {
                files: ['.src/css/below/*.css'],
                tasks: ['clean:below', 'concat:below', 'autoprefixer:below', 'cssmin:below'],
                options: {
                    spawn: true
                }
            },
            cssNoconcat: {
                files: ['.src/css/noconcat/*.css'],
                tasks: ['autoprefixer:noconcat', 'cssmin:noconcat'],
                options: {
                    spawn: true
                }
            },

            // Watch SVG icon changes
            iconizr: {
                files: ['.src/icons/**/*.svg'],
                tasks: ['iconizr'],
                options: {
                    spawn: true
                }
            },

            // Watch & uglify changing JavaScript resources
            jsWeb: {
                files: ['js/*.js', '!js/*.min.js'],
                tasks: ['uglify'],
                options: {
                    spawn: true
                }
            },
            jsSlides: {
                files: ['.src/slides/js/**/*.js'],
                tasks: ['js-slides']
            },

            htmlWeb: {
                files: '.src/html/**/*.html',
                tasks: ['html']
            },
            htmlSlides: {
                files: '.src/slides/html/**/*.html',
                tasks: ['html-slides']
            },

            images: {
                files: '.src/img/**/*.{png,jpg,gif}',
                tasks: ['images']
            },
        }
    });

    // Default task.
    grunt.registerTask('default', ['iconizr', 'sass', 'css', 'js']);
    grunt.registerTask('css', ['clean:general', 'clean:above', 'clean:below',
        'concat:general', 'concat:above', 'concat:below',
        'autoprefixer',
        'cssmin']);
    grunt.registerTask('css-slides', ['clean:slides', 'sass:slides', 'autoprefixer:slides', 'cssmin:slides', 'html-slides']);
    grunt.registerTask('js', ['uglify:web']);
    grunt.registerTask('js-slides', ['uglify:slides']);
    grunt.registerTask('icons', ['iconizr']);
    grunt.registerTask('images', ['imagemin:web']);
    grunt.registerTask('images-slides', ['imagemin:slides']);
    grunt.registerTask('html', ['string-replace:web', 'htmlmin:web']);
    grunt.registerTask('html-slides', ['string-replace:slides', 'htmlmin:slides']);

    grunt.registerTask('favicon', ['clean:favicon', 'favicons', 'copy:favicon', 'replace:favicon']);

};
