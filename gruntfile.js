module.exports = function(grunt) {
    grunt.initConfig({ 
        sweetjs: {
            options: {
                readableNames: true,
                modules: ["./macros/dominator.sjs"],
                sourceMap: false
            },
            target_2:{
                src: 'src/*.js',
                dest: './www/'
            }
        },
    //  sass: { dist: { files:{ 'client/main.css' : 'css/main.scss' } } },
        watch: {
            options: {
                nospawn: true
            },
        //  css: { files: 'css/**/*.scss', tasks: ['sass'] },
            sweetjs: {
                files: ['src/*.js'],
                tasks: ['sweetjs:target_2']
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