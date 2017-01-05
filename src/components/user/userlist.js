import React from 'react';

export default class UserList extends React.Component {

    render() {
        return (
            <div className="ui divided items">
                <div className="item">
                    <div className="image"></div>
                    <div className="content">
                        <a className="header">12 Years a Slave</a>
                        <div className="meta">
                            <span className="cinema">Union Square 14</span>
                        </div>
                        <div className="description">
                            <p></p>
                        </div>
                        <div className="extra">
                            <div className="ui label">IMAX</div>
                            <div className="ui label">
                                <i className="globe icon"></i>
                                Additional Languages</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
