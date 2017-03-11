import React from 'react';
import {
    Dropdown,
    Icon,
    Menu,
    Segment,
    Container,
    Input
} from 'semantic-ui-react'

import {browserHistory} from 'react-router';

export default class NavBar extends React.Component {

    navigate(name) {
        switch (name) {
            case "home":
                browserHistory.push("/");
                masonry.reload("pins");
                break;
            case "discover":
                browserHistory.push("/discover");
                masonry.reload("boards");
                break;
            case "profile":
                browserHistory.push("/profile");
                masonry.reload("boards");
                break;
            case "camera":
                browserHistory.push("/camera");
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
                    <Menu.Item onClick={e => this.navigate("home")}>
                        <img className="ui mini circular image" src="/img/whitelogo.png"/>
                    </Menu.Item>
                    <Menu.Item style={{
                        width: '70%'
                    }}>
                        <Input icon placeholder='Search...'>
                            <input/>
                            <Icon name='search'/>
                        </Input>
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item icon onClick={e => this.navigate("discover")}>
                            <Icon name="empty star" size={"big"}></Icon>
                        </Menu.Item>
                        <Menu.Item icon onClick={e => this.navigate("notifications")}>
                            <Icon name="lightning" size={"big"}></Icon>
                        </Menu.Item>
                        <Menu.Item icon onClick={e => this.navigate("profile")}>
                            <Icon name="smile" inverted size={"big"}></Icon>
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
        );
    }
}
