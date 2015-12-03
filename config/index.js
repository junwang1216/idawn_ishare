'use strict';

var _ = require('lodash');

// Load app configuration
module.exports = _.merge(
    require(__dirname + '/all.js'),
    require(__dirname + '/' + process.env.NODE_ENV + '.local.js') || {}
);
