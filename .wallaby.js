module.exports = function (wallaby) {
  return {
    files: [
      'react-native-responsive-grid/src/**/*.js',
      '!react-native-responsive-grid/src/**/*.test.js'
    ],

    tests: [
      'react-native-responsive-grid/src/**/*.test.js'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    testFramework: 'jest'
  };
};
