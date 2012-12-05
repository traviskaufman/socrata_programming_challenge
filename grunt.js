/**
 * Build file for linting and testing
 */
require('shelljs/global');

/**
 * Export tasks.
 *
 * @param {Object} grunt
 *    See grunt.js documentation.
 */
module.exports = function(grunt) {
  grunt.initConfig({
    lint: {
      all: ['./index.js', 'test/*.js', 'lib/*.js', 'grunt.js']
    }
  });

  grunt.registerHelper('sh', function(cmd) {
    console.log(cmd);
    var retCode = exec(cmd).code;
    if (retCode && retCode !== 0) {
      console.log('Error: ' + cmd + ' failed with exit code ' + retCode);
      process.exit(1);
    }
  });

  grunt.registerHelper('notice', function(msg) {
    var stars = (function() {
      var _arr = [];
      for (var i = 0, l = msg.length + 4; i < l; i++) {
        _arr.push('*');
      }
      return _arr;
    })().join('');
    console.log('\n' + stars + '\n* ' + msg + ' *\n' + stars + '\n');
  });

  // I like Jasmine better than NodeUnit or QUnit
  grunt.registerTask('jasmine', 'run jasmine tests in NodeJS', function() {
    grunt.helper('sh',
     './node_modules/jasmine-node/bin/jasmine-node --color --verbose tests/');
    grunt.helper('notice', 'All tests passed!');
  });

  grunt.registerTask('default', 'lint jasmine');
};
