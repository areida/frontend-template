/* jshint globalstrict: true */
/* global window, __ENVIRONMENT__ */
'use strict';

var React  = require('react');
var Router = require('react-router');
var routes = require('./routes');
var flux   = require('./flux');

var state = window.document.getElementById('server-state');

require('./ui/scss/app.scss');

if (__ENVIRONMENT__ !== 'production') {
    require('./ui/scss/style-guide.scss');
}

window.React = React;

React.initializeTouchEvents(true);

if (state) {
    flux = flux.fromObject(window.__STATE__);
    state.remove();
}

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
    React.render(React.createElement(Handler, {flux : flux}), window.document.body);
});
