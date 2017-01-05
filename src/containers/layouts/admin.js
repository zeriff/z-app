import React from 'react';

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="ui container">
                <div className="ui borderless top fixed small menu">
                    <a href="/" className="item">
                        <img className="ui mini circular image" src="/img/logo.png"></img>
                    </a>
                    <div className="item">
                        <a href="" className="ui mini basic black button">Dashboard</a>
                    </div>
                    <div className="item">
                        <a href="" className="ui mini basic black button">Users</a>
                    </div>
                    <div className="item">
                        <a href="" className="ui mini basic black button">Pins</a>
                    </div>
                    <div className="item">
                        <a href="" className="ui mini basic black button">Boards</a>
                    </div>
                    <div className="right menu">
                        <a className="item username">
                            {this.props.user.username}
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
