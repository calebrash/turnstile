module.exports = function(grunt) {

    grunt.initConfig({
        lint: {
            all: ['turnstile.js']
        },
        min: {
            dist: {
                src: ['turnstile.js'],
                dest: 'turnstile.min.js'
            }
        }
    });

    grunt.registerTask('default', 'lint min');

};

