import React from 'react';

export default class Auth extends React.Component {
    render() {
        return (
            <div>	
                {this.props.children}
            </div>
        );
    }
}
