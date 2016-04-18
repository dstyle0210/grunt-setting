/*
npm install grunt grunt-contrib-clean 
*/

module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            dist: {
                files:[{
                    expand: true,
                    cwd: 'src/less/',
                    src: ['**/*.less','!policeSKT.less','!lib/*.less'],
                    dest: 'src/less/',
                    ext: '.concat.css'
            	}]
            },
            dev: {
                files:[{
                    expand: true,
                    cwd: 'src/less/',
                    src: ['*.less'],
                    dest: 'src/css/',
                    ext: '.css'
                }]
            }
        },
        concat: {
            options: {
              separator: '\n',
            },
            component:{
              src: ['src/js/component/*.concat.js','src/js/component.js'],
              dest: 'dist/js/component.js',
            },
            css:{
            	src: ['src/less/**/*.concat.css','!src/less/reset.concat.css'],
                dest: 'dist/css/policeSKT.css'
            }
          },
          uglify: {
        	  options:{
        		  // banner: '/*! <%= grunt.task.current.name %> : <%= grunt.task.current.file %> */'
        		  // preserveComments:"some"
        	  },
        	  component: {
        		  files: [{
        	          expand: true,
        	          cwd: 'src/js/component',
        	          src: ['*.js','!*.concat.js'],
        	          dest: 'src/js/component',
        	          ext: '.concat.js'
        	      }]
        	    }
        	  },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['lib/**'],
                    dest: 'dist'
                },{
                    expand: true,
                    cwd: 'src',
                    src: ['images/**'],
                    dest: 'dist'
                }]
            },
            resetcss:{
            	src:"src/less/reset.concat.css",
            	dest:"dist/css/reset.css"
        	}
        },
        cssmin: {
            concat: {
                expand: true,
                src: ['src/less/**/*.concat.css','src/less/reset.concat.css'],
                ext: '.concat.css'
            }
        },
        // CSS Comb
        csscomb: {
            options:{
                config:"zen.json"
            },
            dynamic_mappings: {
                expand: true,
                cwd: 'src/css/',
                src: ['*.concat.css','**/*.concat.css'],
                dest: 'src/css/',
                ext: '.concat.css'
            }
        },
        replace: {
            dist:{
                src: ['src/less/**/*.concat.css'],
                overwrite: true,
                replacements: [
                    { from: /}/g, to: "}\n" },
                    {from:"UTF-8\";",to:"UTF-8\";\n"},
                    {from:"*/",to:"*/\n"},
                    {from:"/*!",to:"\n/*!"}
                ]
            },
            html:{
                src: ['dist/*.html'],
                overwrite: true,
                replacements: [
                    { from:"jsp", to: "html" },
                    { from:/(<!-- DELETE -->)((\r\n|\r|\n|\s)*(<script.*>)(\r\n|\r|\n|\s)*)*(<!-- DELETEND -->)/g, to: "" }
                ]
            }
        },
        // dist 폴더 삭제.
        clean: {
            dist:["dist/*"],
            zip:["policeSKT.zip","policeSKT_dist.zip"],
            css:["src/**/*.concat.css"],
            js:["src/**/*.concat.js"]
        },
        // 산출물 압축
        compress: {
            full: {
                options: {
                    archive: 'policeSKT.zip'
                },
                files: [
                    {src: ['src/**','dist/**','Gruntfile.js','package.json','zen.json'], dest: '/', filter: 'isFile'} // includes files in path
                ]
            },
            dist: {
                options: {
                    archive: 'policeSKT_dist.zip'
                },
                files: [
                    {expand: true,cwd: 'dist/',src: '**/*.*'} // includes files in path
                ]
            }
        },
        watch: {
			less:{
				files: ['src/**/*.less'],
				tasks: ['less:dev']
			}
		},
		gethttp:{
			options:{
				url:"http://localhost:8085/"
			},
			dist:{
				files: [{
					filter: 'isFile',
					expand: true,
	                cwd: 'src',
	                src: ['*.jsp'],
	                dest: 'dist',
	                ext: '.html'
				}]
			}
		}
	});

    /*
     * 작업에 필요한 모듈 로드하기 grunt.loadNpmTasks('grunt-ANY-PLUGIN');
     */
    for (var key in grunt.file.readJSON("package.json").devDependencies) {
        if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
    };
    grunt.loadNpmTasks('grunt-gethttp');

    grunt.registerTask('dist:css', ['clean:css','less:dist','csscomb','cssmin','replace:dist','concat:css','copy:resetcss','clean:css']);
    grunt.registerTask('dist:js', ['clean:js','uglify','concat:component','clean:js']);
    // grunt.registerTask('dist:html', ['getHttp','replace:html']);
    grunt.registerTask('dist', ['clean:dist','gethttp','dist:css','dist:js','replace:html','copy:dist']);
    grunt.registerTask('zip', ['clean:zip','compress']);
    // grunt.registerTask('default', ['getHttp']);
    grunt.registerTask('default', ['gethttp','replace:html']);
	grunt.registerTask('dev', ['watch']);
};