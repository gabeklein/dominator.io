module.exports = function(grunt) {

    grunt.initConfig({
        sweetjs:{
            options: {
                modules: ["/Users/termtm/Projects/Dominator.io/macros/mymacros.sjs"],
                sourceMap: false,
                readableNames: true
            },
            compile:{
                src: 'src/*.js',
                dest: 'build/'
            }
        },
        replace: { dist: {
          options: {
            patterns: [ { match: /\$\d+/g, replacement: '' } ]
          },
          files: [ {src: ['build/dominator.js'], dest: './'} ]
        }},
        watch:{
           options: {
               nospawn: true
           },
           sweetjs: {
               files: ['src/*.js'],
               tasks: ['sweetjs:compile', 'replace:dist']
           }
        }
    })

    grunt.event.on('watch', function(action, filepath, target) {
        if(action == 'changed' && target == 'sweetjs') {
            grunt.config.set('sweetjs.src.src', [filepath]);
            grunt.config.set('sweetjs.src.dest', filepath.replace(/^src/, 'build'));
        }
    });
    
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sweet.js');
    grunt.loadNpmTasks('grunt-replace');

    grunt.registerTask('default', ['sweetjs', 'replace']);
};
