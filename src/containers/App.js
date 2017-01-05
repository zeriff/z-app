import React from 'react';
import Session from './layouts/session';
import Application from './layouts/application';
import Admin from './layouts/admin';
import PinModal from './home/pins_modal';
import {browserHistory} from 'react-router';
import storageMgr from '../utils/storagemanager';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        let userDetails = storageMgr.getUserDetails();
        if (userDetails != undefined) {
            this.state = {
                session: true,
                user: userDetails
            }
        } else {
            this.state = {
                session: false
            }
        }
    }

    componentDidMount() {
        if (this.state.session) {
            if (this.state.user.isAdmin) {
                browserHistory.push('/admin');
            }
        }
    }

    getLayout() {
        let layout = "";
        if (this.state.session) {
            if (this.state.user.isAdmin) {
                layout = (
                    <Admin user={this.state.user}></Admin>
                )
            } else {
                layout = (
                    <Session user={this.state.user}></Session>
                )
            }
        } else {
            layout = (
                <Application></Application>
            )
        }
        return layout;
    }

    render() {
        return (
            <div className="main_content">
                {this.getLayout()}
                <div className="children">
                    {this.props.children}
                </div>
                <PinModal></PinModal>
            </div>
        )
    }
}
