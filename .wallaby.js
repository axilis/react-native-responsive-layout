module.exports = function (wallaby) {
  return {
    files: [
      '/src/**/*.js',
      '!/src/**/*.test.js'
    ],

    tests: [
      '/src/**/*.test.js'
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
