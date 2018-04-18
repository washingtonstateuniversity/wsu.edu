var Promise = require( "es6-promise" ).polyfill();

module.exports = function( grunt ) {
	grunt.initConfig( {
		pkg: grunt.file.readJSON( "package.json" ),

		stylelint: {
			src: [
				"src/css/*.css",
				"src/css-legacy/*.css",
				"src/css-top-ten/*.css",
				"src/css/components/*.css",
				"src/css/editor-blocks/*.css",
			],
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
			main_styles: {
				src: [
					"src/css/*.css"
				],
				dest: "temp-style.css"
			},
			top_ten_styles: {
				src: [
					"src/css-top-ten/hero-feature.css",
					"src/css-top-ten/content-card.css",
					"src/css-top-ten/top-ten.css"
				],
				dest: "src/css-top-ten/temp-combined-top-ten.css"
			},
			component_display_styles: {
				src: [
					"src/css/components/*.home.css",
				],
				dest: "src/css/components.home.tmp.css",
			},
			block_editor_styles: {
				src: [
					"src/css/editor-blocks/*.css",
				],
				dest: "src/css/editor-blocks.tmp.css",
			},
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
				src: "src/css-top-ten/temp-combined-top-ten.css",
				dest: "css/combined-top-ten.css"
			},
			legacy_edit_css: {
				options: {
					map: true,
					diff: false,
					processors: [
						require( "autoprefixer" )( {
							browsers: [ "> 1%", "ie 8-11", "Firefox ESR" ]
						} )
					]
				},
				src: "src/css-legacy/edit-css.css",
				dest: "css/edit-css.css"
			},
			features_css: {
				options: {
					map: true,
					diff: false,
					processors: [
						require( "autoprefixer" )( {
							browsers: [ "> 1%", "ie 8-11", "Firefox ESR" ]
						} )
					]
				},
				src: "src/css-legacy/features-style.css",
				dest: "css/features-style.css"
			},
			home_style_css: {
				options: {
					map: true,
					diff: false,
					processors: [
						require( "autoprefixer" )( {
							browsers: [ "> 1%", "ie 8-11", "Firefox ESR" ]
						} )
					]
				},
				src: "src/css-legacy/home-style.css",
				dest: "css/home-style.css"
			},
			internal_style_css: {
				options: {
					map: true,
					diff: false,
					processors: [
						require( "autoprefixer" )( {
							browsers: [ "> 1%", "ie 8-11", "Firefox ESR" ]
						} )
					]
				},
				src: "src/css-legacy/internal-style.css",
				dest: "css/internal-style.css"
			},
			main_style_css: {
				options: {
					map: true,
					diff: false,
					processors: [
						require( "autoprefixer" )( {
							browsers: [ "> 1%", "ie 8-11", "Firefox ESR" ]
						} )
					]
				},
				src: "temp-style.css",
				dest: "style.css"
			},
			component_display_styles: {
				options: {
					processors: [
						require( "autoprefixer" )( {
							browsers: [ "> 1%", "ie 10-11" ]
						} )
					]
				},
				src: "src/css/components.home.tmp.css",
				dest: "css/components.home.css",
			},
			block_editor_styles: {
				options: {
					map: true,
					diff: false,
					processors: [
						require( "autoprefixer" )( {
							browsers: [ "> 1%", "ie 10-11" ]
						} )
					]
				},
				src: "src/css/editor-blocks.tmp.css",
				dest: "css/editor-blocks.css",
			},
		},

		clean: {
			options: {
				force: true
			},
			temp: [
				"src/css-top-ten/temp*.*",
				"temp-style.css",
				"src/css/*.tmp.css",
			],
		},

		jscs: {
			scripts: {
				src: [ "Gruntfile.js", "src/js/*.js" ],
				options: {
					preset: "jquery",
					requireCamelCaseOrUpperCaseIdentifiers: false, // We rely on name_name too much to change them all.
					disallowTrailingComma: false,
					maximumLineLength: 250,
				},
			},
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
				files: [ "src/js/*.js" ],
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
	grunt.registerTask( "default", [ "jscs", "jshint", "stylelint", "concat", "postcss", "uglify", "clean" ] );
	grunt.registerTask( "serve", [ "connect", "watch" ] );
};
