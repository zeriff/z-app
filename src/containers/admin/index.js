import React from 'react';
import Dashboard from './dashboard';

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="ui container">
                <Dashboard></Dashboard>
            </div>
        )
    }
}
