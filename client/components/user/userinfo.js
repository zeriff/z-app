import React from 'react';
import {Header, Button, Icon, Input, Image} from 'semantic-ui-react'
import Follow from '../button/follow';
import EditProfile from '../modal/editprofile';

class UserInfo extends React.Component {
    state = {
        openEditProfile: false,
        isFollowing: false
    }
    constructor(props) {
        super(props);
        let me = this;
        me.toggleEditProfile = me
            .toggleEditProfile
            .bind(me);
    }

    toggleEditProfile() {
        this.setState({
            openEditProfile: !this.state.openEditProfile
        });
    }

    bgText = {
        backgroundColor: 'white'
    }
    raleway = {
        fontFamily: '"Raleway", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif'
    }
    normalraleway = {
        ...this.raleway,
        ...this.bgText,
        fontWeight: "200"
    }

    boldRaleway = {
        fontSize: "0.9em",
        ...this.raleway,
        ...this.bgText,
        fontWeight: '600'
    }
    whiteBgText = {
        ...this.bgText,
        ...this.boldRaleway
    }

    render() {
        return (
            <div>
                <EditProfile
                    open={this.state.openEditProfile}
                    closeModal={this.toggleEditProfile}></EditProfile>
                <Header as='h1'>
                    <span >
                        <span style={this.boldRaleway}>
                            {this.props.name}&nbsp;&nbsp;
                        </span>
                        <Image
                            size="mini"
                            style={{
                            display: 'inline'
                        }}
                            src="/img/edit.png"
                            onClick={this.toggleEditProfile}></Image>
                        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <Follow user_id={this.props._creator}></Follow>
                </Header>
                <Header as='h2'>
                    <span style={this.normalraleway}>
                        {this.props.profession}
                    </span>
                </Header>
                <Header as='h3'>
                    <span style={this.normalraleway}>
                        {this.props.bio}
                    </span>
                </Header>
            </div>
        )
    }
}

export default UserInfo;
