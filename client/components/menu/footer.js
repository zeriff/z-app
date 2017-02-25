import React from 'react';
import {Icon, Menu} from 'semantic-ui-react'
import {Link} from 'react-router';
import {Grid, Button, Header, Modal} from 'semantic-ui-react'

export default class Footer extends React.Component {
    state = {
        activeItem: 'home',
        cameramodal: false
    }
    handleItemClick = (e, {name}) => this.setState({activeItem: name})

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
                <Menu.Item as={Link} to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
                    <img className="ui m_image circular image" src="/img/logo.png"></img>
                </Menu.Item>
                <Menu.Item as={Link} to='/discover' name='discover' active={activeItem === 'discover'} onClick={this.handleItemClick}>
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

                <Menu.Item as={Link} to='/notifications' name='notifications' active={activeItem === 'notifications'} onClick={this.handleItemClick}>
                    <Icon name='inbox'/>
                </Menu.Item>
                <Menu.Item as={Link} to='/you' name='you' active={activeItem === 'you'} onClick={this.handleItemClick}>
                    <Icon name='smile'/>
                </Menu.Item>
            </Menu>
        )
    }
}
