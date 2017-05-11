import React from 'react';
import {
    Segment,
    Container,
    Divider,
    Image,
    Header,
    Grid,
    Button,
    Icon,
    Reveal,
    Dropdown
} from 'semantic-ui-react'

import UserStates from './user/userstates';
import UserInfo from './user/userinfo';
import * as actions from '../actions/session';
import {connect} from 'react-redux';
import ProfilePicUploader from './modal/ProfilepicUploader';
import ReactDom from 'react-dom';
import ProfileViewer from './modal/profileviewer';

class ProfileTile extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeHandler = this
            .onChangeHandler
            .bind(this);

        this.toggleUploader = this
            .toggleUploader
            .bind(this);

        this.toggleViewer = this
            .toggleViewer
            .bind(this);
    }

    state = {
        picUploader: false,
        pic: "",
        profileviewer: false
    }

    whiteText = {
        color: 'white'
    }

    whiteBgText = {
        backgroundColor: 'white',
        fontWeight: '200'
    }

    styles = {
        username: {
            fontWeight: '200',
            fontFamily: '"Raleway", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif'
        }
    }

    toggleViewer() {
        this.setState({
            profileviewer: !this.state.profileviewer
        });
    }

    onChangeHandler(e) {
        var file = e.target.files[0];
        if (!file) 
            return;
        
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({picUploader: true, pic: reader.result});
        };
        reader.readAsDataURL(file);
    }
    toggleUploader() {
        this.setState({
            picUploader: !this.state.picUploader
        })
    }
    renderAvatar(profile) {
        return (
            <div style={{
                paddingTop: '25px'
            }}>
                <div className="overlay-div">
                    <Image
                        shape='circular'
                        size='medium'
                        src={profile.avatar
                        ? profile.avatar.thumb
                        : ''}
                        centered></Image>
                    <div className="light-overlay">
                        <div
                            style={{
                            paddingTop: "50%"
                        }}>
                            <label htmlFor="pin_image" className="ui tiny button">
                                Edit
                            </label>
                            <input
                                style={{
                                display: 'none'
                            }}
                                id="pin_image"
                                ref="in"
                                type="file"
                                accept="image/*"
                                onChange={this.onChangeHandler}
                                ref={input => this.inputElement = input}/>

                            <Button size="tiny" onClick={this.toggleViewer}>View</Button>
                        </div>
                    </div>
                </div>
                <ProfilePicUploader
                    open={this.state.picUploader}
                    closeModal={this.toggleUploader}
                    src={this.state.pic}></ProfilePicUploader>

                <ProfileViewer
                    open={this.state.profileviewer}
                    closeModal={this.toggleViewer}
                    src={this.props.profile.avatar
                    ? this.props.profile.avatar.original
                    : ''}></ProfileViewer>

            </div>

        )
    }

    getImage() {
        return (
            <Image
                src="/img/settings.png"
                style={{
                width: '42px',
                top: '-10px',
                right: '-10px'
            }}></Image>
        );
    }
    render() {

        const {profile} = this.props;
        return (
            <Segment color="black" inverted>
                <Dropdown className="ui icon right floated button" icon="setting">
                    <Dropdown.Menu>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item
                            onClick={e => this
                            .props
                            .logout()}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Header as='h3' icon textAlign='center' inverted>
                                {this.renderAvatar(profile)}
                                <Header.Content
                                    style={{
                                    paddingTop: "15px"
                                }}>
                                    <span style={this.styles.username}>
                                        {profile.username}
                                    </span>
                                </Header.Content>
                            </Header>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <UserInfo {...profile}></UserInfo>
                            <br></br>
                            <UserStates {...profile}></UserStates>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

export default connect(null, actions)(ProfileTile);
