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
					'includes/js/fos-view.js',
					'js/wsu-home-navigation-view.js',
					'js/wsu-home-primary.js'
				],
				dest: 'js/wsu-home.js'
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
			}
		},

		clean: {
			temporary: {
				src: [
					'includes/js/media-wall.full.js',
					'js/wsu-home.js'
				]
			}
		},

		watch: {
			files: [
				'includes/js/media-wall-item-model.js',
				'includes/js/media-wall-item-view.js',
				'includes/js/media-wall-view.js',
				'includes/js/media-wall.js',
				'js/wsu-home-navigation-view.js',
				'js/wsu-home-primary.js'
			],
			tasks: ['default']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['concat', 'uglify', 'clean']);
};
