'use strict';

// React must be in scope when using JSX because JSX is translated into React.createElement(...)
const React = require('react');
const ReactDOM = require('react-dom');

var MyComponent = require('./components/my-component');


require('./main-app.less');



function mainApp () {
    ReactDOM.render(
        <MyComponent name='World'/>,
        document.getElementById('appContainer')
    );
}



document.addEventListener('DOMContentLoaded', mainApp);