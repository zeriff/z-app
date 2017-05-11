import React from 'react';
import {connect} from 'react-redux';
import 'rc-tabs/assets/index.css';
import ProfileTile from '../components/profiletile';
import * as actions from '../actions/profile';
import {Container, Grid, Menu, Divider} from 'semantic-ui-react';
import {browserHistory} from 'react-router';
import {StickyContainer, Sticky} from 'react-sticky';

class Profile extends React.Component {
    componentDidMount() {
        let id = this.props.routeParams.id

        this
            .props
            .load_is_current_user(id);
        this
            .props
            .fetchProfile(id);
        switch (this.props.location.pathname) {
            case "/profile":
            case "/myfeeds":
                this.setState({activeItem: "myfeeds"});
                break;
            case "/invites":
                this.setState({activeItem: "invites"});
                break;
        }
    }
    state = {
        followOpen: false,
        activeItem: 'myfeeds'
    }

    styles = {
        profilecontainer: {
            paddingBottom: '5px',
            paddingLeft: '8px',
            paddingRight: '8px'
        }
    }
    handleItemClick = (e, {name, display}) => {
        this.setState({activeItem: display});
        if (display == 'myfeeds') {
            display = 'profile'
        }
        browserHistory.push("/" + display);
    }

    renderMenuItems() {}

    render() {
        const {activeItem} = this.state;
        return (
            <div>
                <Container style={this.styles.profilecontainer}>
                    <ProfileTile {...this.props}/>
                </Container>
                <Container>
                    <Grid centered>
                        <Grid.Column width={16}>
                            <StickyContainer>
                                <Sticky
                                    stickyStyle={{
                                    marginTop: '60px',
                                    zIndex: '24'
                                }}>
                                    <header
                                        style={{
                                        marginBottom: '3px'
                                    }}>
                                        <div
                                            className="ui horizontal divider"
                                            style={{
                                            margin: '0px',
                                            background: '#f5f5f5'
                                        }}>

                                            {this.props.is_current_user
                                                ? (
                                                    <Menu
                                                        pointing
                                                        secondary
                                                        style={{
                                                        borderBottom: "0px"
                                                    }}>
                                                        <Menu.Item
                                                            className="customtabs"
                                                            display="myfeeds"
                                                            name='My Feeds'
                                                            active={activeItem === 'myfeeds'}
                                                            onClick={this.handleItemClick}/>

                                                        <Menu.Item
                                                            className="customtabs"
                                                            display="invites"
                                                            name='invites'
                                                            active={activeItem === 'invites'}
                                                            onClick={this.handleItemClick}/>
                                                    </Menu>
                                                )
                                                : (
                                                    <div></div>
                                                )}

                                        </div>

                                    </header>
                                </Sticky>
                                {this.props.children}
                            </StickyContainer>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {profile: state.profile, is_current_user: state.profile.is_current_user}
}

export default connect(mapStateToProps, actions)(Profile);
