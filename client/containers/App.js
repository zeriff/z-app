import React from 'react';
import {browserHistory} from 'react-router';
import storageMgr from '../utils/storagemanager';
import Footer from "../components/menu/footer";
import TopMenu from "../components/menu/topmenu";

export default class App extends React.Component {

    render() {
        return (
            <div className="main_content">
                <TopMenu></TopMenu>
                <div className="children">
                    {this.props.children}
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
