module.exports = function(grunt) {

  grunt.config.set('mocha_istanbul', {
    unit: {
      src: ['tests/unit/*.spec.js'], // the folder, not the files
      options: {
        coverageFolder: 'coverage/unit',
        root: 'api/models',
        reporter: 'mocha-junit-reporter',
        mochaOptions: ['--harmony','--async-only'],
        istanbulOptions: ['--harmony','--handle-sigint'],
        reporting: {
          watermarks: {
            statements: 0,
            lines: 0,
            functions: 0,
            branches: 0,
          }
        }
      }
    },
    integration: {
      src: ['tests/integration/bootstrap.test.js', 'tests/integration/*.spec.js'], // specifying file patterns works as well
      options: {
          //dryRun: true,
          coverageFolder: 'coverage/integration',
          // reporter: 'mocha-junit-reporter',
          root: 'api/controllers',
          mochaOptions: ['--harmony','--async-only'], // any extra options
          reporting: {
            watermarks: {
              statements: 0,
              lines: 0,
              functions: 0,
              branches: 0,
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-istanbul');

};