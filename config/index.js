'use strict';

var _ = require('lodash');

// Load app configuration
module.exports = _.merge(
    require(__dirname + '/config.js')
);
