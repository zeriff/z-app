import React from 'react';

export default class UserList extends React.Component {

    renderUserList() {

        return this.props.users.map(function(user) {

            return (
                <div key={Math.random()} className="item">
                    <div className="image"></div>
                    <div className="content">
                        <a className="header">{user.username}</a>
                        <div className="meta">
                            <span className="cinema">{user.email}</span>
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
            )

        });
    }

    render() {
        return (
            <div className="ui divided items">
                {this.renderUserList()}
            </div>
        )
    }
}
