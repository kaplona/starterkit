'use strict';

const React = require('react');
const AppPaths = require('../config/app-paths');


var AppView = function () {
    return (
        <html>
        <head>
            <meta charSet='utf-8' />
            <title>Main App</title>
            <script src={ `${AppPaths.public.build}app-bundle.js` }></script>
        </head>
            <body>
                <div id='appContainer'>This text will be replaced by React components</div>
            </body>
        </html>
    );
};

module.exports = AppView;
