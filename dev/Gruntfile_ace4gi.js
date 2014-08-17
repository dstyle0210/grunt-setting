module.exports = function(grunt) {
 
  
 
  grunt.initConfig({
    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: [
          'javascript/*.js'
        ],
        dest: 'public/js/main.min.js'
      },
    },
    uglify: {
      options: {
        mangle: false
      },
      js: {
        files: {
          'public/js/main.min.js': ['public/js/main.min.js']
        }
      }
    },
    less: {
      style: {
        files: {
          "public/css/style.css": "less/style.less"
        }
      }
    },
    watch: {
      js: {
        files: ['javascript/*.js'],
        tasks: ['concat:js', 'uglify:js'],
        options: {
          livereload: true,
        }
      },
      css: {
        files: ['less/*.less'],
        tasks: ['less:style'],
        options: {
          livereload: true,
        }
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
  
  grunt.registerTask('default', ['less','autoprefixer','watch' ]);
  
};




module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),

		/* less파일 -> css파일로변환
		 * https://github.com/gruntjs/grunt-contrib-less
		 */
		less: {
			dist: {
				files: {
					'wwwroot/css/app.css' : ['wwwroot/less/*.less'] 
				}
			}
		},

		watch: {
			less:{
				files: ['wwwroot/less/*.less'],
				tasks: ['less','autoprefixer']
			}
		},
		autoprefixer : {
			options : {
				browsers: ['last 5 version']
			// Task-specific options go here.
			},
			no_dest: {
				src: 'wwwroot/css/*.css' // globbing is also possible here
			}
		}
	});


	/*
	 * 작업에 필요한 모듈 로드하기 grunt.loadNpmTasks('grunt-ANY-PLUGIN');
	 */ 
	/*
	for (var key in grunt.file.readJSON("package.json").devDependencies) {
		if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
	}
	*/

	// Default task(s).
	// grunt.registerTask('default', ['less', 'cssmin', 'requirejs', 'watch']);
	grunt.registerTask('default', ['less','autoprefixer','watch']);
};




