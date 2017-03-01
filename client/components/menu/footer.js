import React from 'react';
import {Icon, Menu} from 'semantic-ui-react'
import {Link} from 'react-router';
import {Grid, Button, Header, Modal} from 'semantic-ui-react'
import {browserHistory} from 'react-router';

export default class Footer extends React.Component {
    state = {
        activeItem: 'home',
        cameramodal: false
    }
    handleItemClick = function(e, {name}) {
        this.setState({activeItem: name})
        switch (name) {
            case "home":
                browserHistory.push("/");
                masonry.reload("pins");
                break;
            case "discover":
                browserHistory.push("/discover");
                masonry.reload("boards");
                break;
            case "you":
                browserHistory.push("/you");
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
    // handleItemClick = (e, {name}) => this.setState({activeItem: name})

    componentDidMount() {
        this.handleFooterState();
    }

    handleFooterState() {
        let array = window.location.pathname.split("");
        array.splice(0, 1);
        let page = array.join("");
        this.setState({
            activeItem: page || "home"
        });
    }
    handleCamera(e) {
        this.setState({
            cameramodal: !this.state.cameramodal
        });
        let me = this;
        setTimeout(function() {
            me.handleFooterState();
        }, 100);
    }
    render() {
        const {activeItem} = this.state
        return (
            <Menu widths={5} fixed={"bottom"} borderless={true} className="f_menubar">
                <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick.bind(this)}>
                    <img className="ui m_image circular image" src="/img/logo.png"></img>
                </Menu.Item>
                <Menu.Item name='discover' active={activeItem === 'discover'} onClick={this.handleItemClick.bind(this)}>
                    <Icon name='star'/>
                </Menu.Item>

                <Modal basic size='small' open={this.state.cameramodal} trigger={(
                    <Menu.Item as={Button} name='camera' active= { activeItem === 'camera' } onClick={this.handleCamera.bind(this)}>
                        <Icon name='camera'/>
                    </Menu.Item>
                )}>
                    <Modal.Content>
                        <Grid stackable divided centered>
                            <Grid.Row columns={4}>
                                <Grid.Column>
                                    <Button circular size="massive" icon="send"></Button>
                                    <h3 className="ui header inverted">Invite</h3>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button circular size="massive" icon="child"></Button>
                                    <h3 className="ui header inverted">New Dream</h3>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button as={Link} to="/camera" circular size="massive" icon="camera" onClick={this.handleCamera.bind(this)}></Button>
                                    <h3 className="ui header inverted">New Pin</h3>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button circular size="massive" icon="close" color='red' onClick={this.handleCamera.bind(this)}></Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                </Modal>

                <Menu.Item name='notifications' active={activeItem === 'notifications'} onClick={this.handleItemClick.bind(this)}>
                    <Icon name='inbox'/>
                </Menu.Item>
                <Menu.Item name='you' active={activeItem === 'you'} onClick={this.handleItemClick.bind(this)}>
                    <Icon name='smile'/>
                </Menu.Item>
            </Menu>
        )
    }
}
