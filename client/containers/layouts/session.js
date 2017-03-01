import React from 'react';
import storageMgr from '../../utils/storagemanager';
import {browserHistory} from 'react-router';

export default class Session extends React.Component {

    logout() {
        storageMgr.removeUser();
        setTimeout(function() {
            browserHistory.push("/auth");
        }, 500);
    }

    render() {
        return (
            <div className="ui container">
                <div className="ui borderless top fixed small menu">
                    <a href="/" className="item">
                        <img className="ui mini circular image" src="/img/logo.png"></img>
                    </a>
                    <div className="right menu">
                        <div className="item username">
                            {this.props.user.username}
                        </div>
                        <div className="item">
                            <div className="ui basic red button" onClick={this.logout.bind(this)}>Logout</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
