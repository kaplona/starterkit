'use strict';

const React = require('react');
const { string } = React.PropTypes;


/**
 * @class MyComponent
 * @extends ReactComponent
 */
class MyComponent extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return <div>Hello { this.props.name }</div>;
    }
}


MyComponent.propTypes = {
    name: string.isRequired
};



module.exports = MyComponent;
