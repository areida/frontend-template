/** @jsx React.DOM */
/* global window */
'use strict';

var _             = require('underscore');
var React         = require('react');
var NavigateMixin = require('ui/mixins/navigate');

React.DOM.$a = React.DOM.a;

React.DOM.a = function (props) {
    if ( ! props.onClick) {
        props.onClick = NavigateMixin.navigate;
    }

    if ( ! props.href && props.route) {
        var routeName   = props.route,
            params      = props.params,
            queryString = props.query;

        props.href = window.app.router.reverse(routeName, params, queryString);
    }

    if (arguments.length > 1) {
        var args = _.toArray(arguments).slice(1);
        args.unshift(props);

        return React.DOM.$a.apply(this, args);
    } else {
        return React.DOM.$a.call(this, props);
    }
};
