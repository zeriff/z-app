import React from 'react';
import {Container} from 'semantic-ui-react';

export default class View extends React.Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
