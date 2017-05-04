var Promise = require( "es6-promise" ).polyfill();

module.exports = function( grunt ) {
	grunt.initConfig( {
		pkg: grunt.file.readJSON( "package.json" ),

		stylelint: {
			src: [ "src/css/*.css" ]
		},

		concat: {
			home_scripts: {
				src: [
					"src/js/wsu-home-fos-view.js",
					"src/js/wsu-home-navigation-view.js",
					"src/js/wsu-home-primary.js",
					"src/js/wsu-alert-display.js"
				],
				dest: "js/wsu-home.js"
			},
			feature_scripts: {
				src: [
					"src/js/wsu-home-navigation-view.js",
					"src/js/wsu-home-primary.js",
					"src/js/wsu-feature-primary.js"
				],
				dest: "js/wsu-feature.js"
			},
			top_ten_styles: {
				src: [
					"src/css/hero-feature.css",
					"src/css/content-card.css",
					"src/css/top-ten.css"
				],
				dest: "src/css/temp-combined-top-ten.css"
			}
		},

		postcss: {
			top_ten_scripts: {
				options: {
					map: true,
					diff: false,
					processors: [
						require( "autoprefixer" )( {
							browsers: [ "> 1%", "ie 8-11", "Firefox ESR" ]
						} )
					]
				},
				src: "src/css/temp-combined-top-ten.css",
				dest: "src/css/combined-top-ten.css"
			}
		},

		clean: {
			options: {
				force: true
			},
			temp: [ "src/css/temp*.*" ]
		},

		jscs: {
			scripts: {
				src: [ "Gruntfile.js", "src/js/*.js" ],
				options: {
					preset: "jquery",
					requireCamelCaseOrUpperCaseIdentifiers: false, // We rely on name_name too much to change them all.
					maximumLineLength: 250
				}
			}
		},

		jshint: {
			grunt_script: {
				src: [ "Gruntfile.js" ],
				options: {
					curly: true,
					eqeqeq: true,
					noarg: true,
					quotmark: "double",
					undef: true,
					unused: false,
					node: true     // Define globals available when running in Node.
				}
			},
			theme_scripts: {
				src: [ "src/js/*.js" ],
				options: {
					bitwise: true,
					curly: true,
					eqeqeq: true,
					forin: true,
					freeze: true,
					noarg: true,
					nonbsp: true,
					quotmark: "double",
					undef: true,
					unused: true,
					browser: true, // Define globals exposed by modern browsers.
					jquery: true   // Define globals exposed by jQuery.
				}
			}
		},

		uglify: {
			home_scripts: {
				src: "js/wsu-home.js",
				dest: "js/wsu-home.min.js"
			},
			feature_scripts: {
				src: "js/wsu-feature.js",
				dest: "js/wsu-feature.min.js"
			}
		},

		phpcs: {
			plugin: {
				src: "./"
			},
			options: {
				bin: "vendor/bin/phpcs --extensions=php --ignore=\"*/vendor/*,*/node_modules/*\"",
				standard: "phpcs.ruleset.xml"
			}
		},

		watch: {
			styles: {
				files: [ "css/*.css", "src/css/*.css", "src/js/*.js" ],
				tasks: [ "default" ],
				option: {
					livereload: 8000
				}
			}
		},

		connect: {
			server: {
				options: {
					open: true,
					port: 8000,
					hostname: "localhost"
				}
			}
		}

	} );

	grunt.loadNpmTasks( "grunt-postcss" );
	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-clean" );
	grunt.loadNpmTasks( "grunt-phpcs" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-contrib-connect" );
	grunt.loadNpmTasks( "grunt-jscs" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-stylelint" );

	// Default task(s).
	grunt.registerTask( "default", [ "jscs", "jshint", "concat", "postcss", "uglify", "clean" ] );
	grunt.registerTask( "serve", [ "connect", "watch" ] );
};
