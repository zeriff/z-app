import React from 'react';
import {browserHistory} from 'react-router';
import {Dropdown, Icon, Menu, Segment, Container} from 'semantic-ui-react'
import storageMgr from '../../utils/storagemanager';

export default class TopMenu extends React.Component {
    back() {
        browserHistory.goBack();
    }
    render() {
        let details = storageMgr.getUserDetails()
        return (
            <div className="topmenu">
                <Menu fixed="top" size={"mini"} borderless={true}>
                    <Container>
                        <Menu.Menu>
                            <Menu.Item onClick={e => browserHistory.push("/")}>
                                <img className="ui mini circular image" src="/img/logo.png"></img>
                            </Menu.Item>
                        </Menu.Menu>
                        <Menu.Menu position="right">
                            <Menu.Item onClick={e => browserHistory.push("/discover")}>
                                <button className="ui basic black button">Discover</button>
                            </Menu.Item>
                            <Menu.Item onClick={e => browserHistory.push("/camera")}>
                                <button className="ui basic yellow button">New</button>
                            </Menu.Item>
                            <Menu.Item onClick={e => browserHistory.push("/you")}>
                                <img className="ui mini circular image" src={details.profile.avatar}></img>
                            </Menu.Item>
                        </Menu.Menu>
                    </Container>
                </Menu>
            </div>
        )
    }
}
