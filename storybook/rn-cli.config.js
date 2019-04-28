const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');
const pkg = require('../package.json');
const escape = require('escape-string-regexp');

module.exports = {
  resolver: {
    blacklistRE: blacklist([
      new RegExp(`^${escape(path.resolve(__dirname, '..', 'node_modules'))}\\/.*$`),
    ]),
    providesModuleNodeModules: [
      'react-native',
      'react',
      '@babel/runtime',
      ...Object.keys(pkg.dependencies),
    ],
  },
  projectRoot: path.resolve(__dirname),
  watchFolders: [
    path.resolve(__dirname, '..'),
  ],
};
