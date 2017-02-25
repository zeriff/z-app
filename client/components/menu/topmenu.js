import React from 'react';
import {browserHistory} from 'react-router';
import {Dropdown, Icon, Menu, Segment, Container} from 'semantic-ui-react'

export default class TopMenu extends React.Component {
    back() {
        browserHistory.goBack();
    }
    render() {
        return (
            <div className="topmenu">
                <Menu fixed="top">
                    <Menu.Menu icon={true}>
                        <a className="item" onClick={this.back.bind(this)}>
                            <i className="chevron left icon"></i>
                        </a>
                        <a className="item">
                            Discover
                        </a>
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}
