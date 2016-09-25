module.exports = function(grunt) {

    grunt.initConfig({
		import_js: {
			files: {
				cwd: 'src/',
				src: 'main.js',
				expand: true,
				dest: 'build/'
			}
		},
        sweetjs:{
            options: {
                modules: ["./macros/macros.sjs"],
                sourceMap: false,
                readableNames: true
            },
            compile:{
                src: 'build/main.js',
                dest: 'build/dist.js'
            }
        },
        replace: { dist: {
			options: {
				patterns: [ { match: /\$\d+/g, replacement: '' } ]
			},
			files: [ {src: ['build/dist.js'], dest: './'} ]
        }},
		copy: {
			main: {
				src: 'build/dist.js',
				dest: 'dist/dominator.io.js',
			}
		},
        watch:{
           options: {
               nospawn: true
           },
           sweetjs: {
               files: ['src/*.js'],
               tasks: ['default']
           }
        }
    })

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sweet.js');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-import-js');

    grunt.registerTask('default', ['import_js', 'sweetjs', 'replace', 'copy']);
};
