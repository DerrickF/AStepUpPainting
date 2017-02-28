module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //Minify Files
        uglify: {
            main: {
                src: 'js/<%= pkg.name %>.js',
                dest: 'js/<%= pkg.name %>.min.js'
            }
        },
        //Copy Files To Release Folder
        copy: {
            main: {
                files: [
                    // includes files within path
                    { expand: true, src: ['index.html', 'css/*.min.css', 'font-awesome/**', 'fonts/**', 'img/**', 'js/**.min.js',], dest: 'release' },
                ]
            },
        },
        //serve it up
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: "",
                    livereload: true,
                    hostname:'localhost',
                    open:true
                }
            }
        },
        //Clean Release Folder
        clean: ["release/**"],
        //Compile and minify the less files
        less: {
            expanded: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "css/<%= pkg.name %>.css": "less/<%= pkg.name %>.less"
                }
            },
            minified: {
                options: {
                    paths: ["css"],
                    cleancss: true
                },
                files: {
                    "css/<%= pkg.name %>.min.css": "less/<%= pkg.name %>.less"
                }
            }
        },
        //Banner for minified code
        banner: '/*!\n' +
        ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
        ' * Copyright 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
        ' */\n',
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: ['css/<%= pkg.name %>.css', 'css/<%= pkg.name %>.min.css', 'js/<%= pkg.name %>.min.js']
                }
            }
        },
        //Watch for change
        watch: {
            scripts: {
                files: ['js/<%= pkg.name %>.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
            less: {
                files: ['less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                }
            },
            options:{
                livereload: true
            },
            html: {
            files: ['index.html'],
            tasks: ['default']
        },
        },
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'less', 'usebanner']);
    grunt.registerTask('serve',['default','connect','watch']);

};