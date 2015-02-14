/* jshint expr: true, globalstrict: true */
'use strict';

// Ensure that chai accepts should-style assertions and is integrated with sinon.
var chai      = require('chai');
var sinonChai = require('sinon-chai');

chai.should();
chai.use(sinonChai);

require('../node_modules/mocha/mocha.css');
require('../node_modules/mocha/mocha.js');
require('../node_modules/sinon/pkg/sinon.js');
require('./favicon.js');
require('./favicon.png');

// Require all modules ending in '-test'
var context = require.context('.', true, /\-test$/);

context.keys().forEach(context);