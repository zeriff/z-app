import React from 'react';
import {
    Dropdown,
    Icon,
    Menu,
    Segment,
    Container,
    Image,
    Input
} from 'semantic-ui-react'

import {browserHistory} from 'react-router';

export default class NavBar extends React.Component {

    navigate(name) {

        switch (name) {
            case "discover":
                browserHistory.push("/discover");
                break;
            case "profile":
                browserHistory.push("/profile");
                break;
            case "notifications":
                browserHistory.push("/notifications");
                break;
        }
    }

    render() {
        return (
            <Menu fixed="top" size="large" borderless={true} color={'black'} inverted>
                <Container>
                    <Menu.Item>
                        <img className="ui mini circular image" src="/img/whitelogo.png"/>
                    </Menu.Item>
                    <Menu.Item style={{
                        width: '70%'
                    }}>
                        <Input className="ralewaytext" icon placeholder="Search What's Trending">
                            <input/>
                            <Icon name="search"/>
                        </Input>
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item icon onClick={e => this.navigate("discover")}>
                            <Image src="/img/favorite.png" size="mini"></Image>
                        </Menu.Item>
                        <Menu.Item icon onClick={e => this.navigate("notifications")}>
                            <Image src="/img/notification.png" size="mini"></Image>
                        </Menu.Item>
                        <Menu.Item onClick={e => this.navigate("profile")}>
                            <Image src="/img/profile.png" size="mini"></Image>
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
        );
    }
}
