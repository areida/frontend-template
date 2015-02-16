/* jshint globalstrict: true, unused: false */
/* globals __ENVIRONMENT__ */
'use strict';

var React  = require('react'); // Used in compiled js, so required even though appears unused
var Route  = require('react-router').Route;

var LoggedInLayout  = require('./ui/layouts/logged-in');
var LoggedOutLayout = require('./ui/layouts/logged-out');
var SiteLayout      = require('./ui/layouts/site');

var GistsPage      = require('./ui/pages/gists');
var InstancesPage  = require('./ui/pages/instances');
var LoginPage      = require('./ui/pages/login');
var ProjectsPage   = require('./ui/pages/projects');
var NotFoundPage   = require('./ui/pages/404');
var StyleGuidePage = require('./ui/pages/style-guide');

var getEnvironmentDependentRoutes = function()
{
    var routes = [];

    if (__ENVIRONMENT__ !== 'production') {
        routes = routes.concat([
            <Route path='/style-guide' name='style-guide' handler={StyleGuidePage} key='style-guide'/>,
            <Route path='/style-guide/:section' name='style-guide-section' handler={StyleGuidePage} key='style-guide-section'/>
        ]);
    }

    return routes;
};

module.exports = (
    <Route handler={SiteLayout}>
        <Route handler={LoggedInLayout}>
            <Route path='/' name='instances' handler={InstancesPage} />
            <Route path='/projects' name='projects' handler={ProjectsPage} />
        </Route>
        <Route handler={LoggedOutLayout}>
            {getEnvironmentDependentRoutes()}
            <Route path='/login' name='login' handler={LoginPage} />
            <Route path='*' name='404' handler={NotFoundPage} />
        </Route>
    </Route>
);
