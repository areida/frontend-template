/* jshint globalstrict: true */
/* global document */
'use strict';

var React      = require('react');
var FluxMixin  = require('fluxxor').FluxMixin(React);
var StateMixin = require('react-router').State;

var SGHeader            = require('../components/style-guide/sg-header');
var ButtonSection       = require('../components/style-guide/sections/sg-buttons');
var FormElementsSection = require('../components/style-guide/sections/sg-form-elements');
var IconSection         = require('../components/style-guide/sections/sg-icons');
var TypographySection   = require('../components/style-guide/sections/sg-typography');

module.exports = React.createClass({

    displayName : 'StyleGuide',

    mixins : [FluxMixin, StateMixin],

    getComponentConstructors : function()
    {
        return [
            TypographySection,
            ButtonSection,
            IconSection,
            FormElementsSection
        ];
    },

    renderSections : function()
    {
        var section = this.getParams().section;

        return this.getComponentConstructors().map(function(Page) {
            if (section === 'all' || section === Page.displayName) {
                return <Page key={Page.displayName} />;
            }
        });
    },

    render : function()
    {
        return (
            <div className='sg'>
                <SGHeader sections={this.getComponentConstructors()} activeSection={this.getParams().section}/>
                <div className='sg-content'>
                    <div className='sg-content__header'>
                        <h1 className='sg-content__title'>{'Style Guide'}</h1>
                    </div>
                    {this.renderSections()}
                </div>
            </div>
        );
    }

});
