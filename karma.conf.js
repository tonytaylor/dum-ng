
module.exports = function (config) {
	config.set({
		basePath: '.',

		files: [
			'js/lib/angular/angular.js',
			'js/tests/lib/angular/angular-mocks.js',
			'js/src/**/*.js',
			'js/tests/unit/**/*.js'
		],

		frameworks: ['jasmine'],

		browsers: ['Firefox', 'Opera'],

		junitReporter: {
			outputFile: 'test_out/unit.xml',
			suite: 'unit'
		},

		singleRun: true
	});
};
