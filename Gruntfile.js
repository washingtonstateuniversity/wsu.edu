module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			media_wall: {
				src: [
					'includes/js/media-wall-item-model.js',
					'includes/js/media-wall-item-view.js',
					'includes/js/media-wall-view.js',
					'includes/js/media-wall.js'
				],
				dest: 'includes/js/media-wall.full.js'
			},
			home_scripts: {
				src: [
					'js/wsu-home-fos-view.js',
					'js/wsu-home-navigation-view.js',
					'js/wsu-home-primary.js'
				],
				dest: 'js/wsu-home.js'
			},
			feature_scripts: {
				src: [
					'js/wsu-home-navigation-view.js',
					'js/wsu-home-primary.js',
					'js/wsu-feature-primary.js'
				],
				dest: 'js/wsu-feature.js'
			}
		},

		uglify: {
			media_wall: {
				src: 'includes/js/media-wall.full.js',
				dest: 'includes/js/media-wall.min.js'
			},
			home_scripts: {
				src: 'js/wsu-home.js',
				dest: 'js/wsu-home.min.js'
			},
			feature_scripts: {
				src: 'js/wsu-feature.js',
				dest: 'js/wsu-feature.min.js'
			}
		},

		clean: {
			temporary: {
				src: [
					'includes/js/media-wall.full.js',
					'js/wsu-home.js',
					'js/wsu-feature.js'
				]
			}
		},

		watch: {
			files: [
				'includes/js/media-wall-item-model.js',
				'includes/js/media-wall-item-view.js',
				'includes/js/media-wall-view.js',
				'includes/js/media-wall.js',
				'js/wsu-home-fos-view.js',
				'js/wsu-home-navigation-view.js',
				'js/wsu-home-primary.js'
			],
			tasks: ['default']
		},

		serve: {
			options: {
				port: 9000
			}
		},

		open : {
			dev : {
				path: 'http://127.0.0.1:9000/style-guide'
			},
			custom: {
				path : function () {
					return grunt.option('path');
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-serve');
	grunt.loadNpmTasks('grunt-open');

	// Default task(s).
	grunt.registerTask('default', ['concat', 'uglify', 'clean']);
	grunt.registerTask('browser', ['open:dev', 'serve'] );
};
