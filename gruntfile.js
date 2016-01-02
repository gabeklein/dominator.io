module.exports = function(grunt) {
    grunt.initConfig({ 
        sweetjs: {
            options: {
                readableNames: true,
                modules: ["/Users/termtm/Projects/Dominator.io/macros/dominator.sjs"],
                sourceMap: false
            },
            compile:{
                src: 'src/*.js',
                dest: './www/'
            }
        },
        watch: {
            options: {
                nospawn: true
            },
            sweetjs: {
                files: ['src/*.js'],
                tasks: ['sweetjs:compile']
            }
        }
    });

    grunt.event.on('watch', function(action, filepath, target) {
        if(action == 'changed' && target == 'sweetjs') {
            grunt.config.set('sweetjs.src.src', [filepath]);
            grunt.config.set('sweetjs.src.dest', filepath.replace(/^src/, 'build'));
        }
    });
    
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sweet.js');

    grunt.registerTask('default', ['sweetjs']);
};