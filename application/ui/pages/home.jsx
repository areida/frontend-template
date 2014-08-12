/** @jsx React.DOM */
'use strict';

var React           = require('react');
var Fluxxor         = require("fluxxor");
var FluxMixin       = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({

    displayName : 'HomeModule',

    mixins : [FluxMixin, StoreWatchMixin('TokenStore')],

    handleLogin : function()
    {
        this.getFlux().actions.login(
            this.refs.username.getDOMNode().value,
            this.refs.password.getDOMNode().value
        );
    },

    getStateFromFlux : function()
    {
        var store = this.getFlux().store('TokenStore');

        return {
            loading  : store.loading,
            loggedIn : store.loggedIn
        };
    },

    render : function()
    {
        if (this.state.loggedIn) {
            return (
                <div>
                    <p>
                        <a route='account-change-password'>Change email</a><br />
                        <a route='account-change-password'>Change password</a>
                    </p>
                    <p>
                        <a href="http://project.vm/social-login/github/link">Link GitHub account</a><br />
                        <a href="http://project.vm/social-login/facebook/link">Link Facebook account</a><br />
                        {/*
                            Google only allows 'localhost" as a non-public domain for callback URLs.
                            This link won't work unless the URLs in models/user.js are also changed to 'localhost'.
                        */}
                        <a href="http://localhost/social-login/google/link">Link Google account</a><br />
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        <input type='text' ref='username' name='username' placeholder='username'/>
                        <input type='password' ref='password' name='password' placeholder='password'/>
                        <button onClick={this.handleLogin}>Submit</button>
                    </div>
                    <p>
                        Or <a href="http://project.vm/social-login/github">log in with GitHub</a>.
                    </p>
                    <p>
                        Or <a href="http://project.vm/social-login/facebook">log in with Facebook</a>.
                    </p>
                    <p>
                        {/* Google only allows "localhost" as a non-public domain for callback URLs. */}
                        Or <a href="http://localhost/social-login/google">log in with Google</a>.
                    </p>
                </div>
            );
        }
    }

});
