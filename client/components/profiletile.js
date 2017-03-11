import React from 'react';
import {
    Segment,
    Container,
    Divider,
    Image,
    Header,
    Grid,
    Button,
    Icon
} from 'semantic-ui-react'

import UserStates from './user/userstates';
import UserInfo from './user/userinfo';

export default class ProfileTile extends React.Component {

    whiteText = {
        color: 'white'
    }

    whiteBgText = {
        backgroundColor: 'white',
        fontWeight: '200'
    }

    styles = {
        username: {
            fontWeight: '300'
        }
    }

    render() {
        const {profile} = this.props;
        return (
            <Segment color="black" inverted>
                <button className="ui right floated icon basic inverted button">
                    <i className="setting icon"></i>
                </button>
                <br></br>
                <br></br>
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header as='h1' icon textAlign='center' inverted>
                                <Image shape='circular' size='medium' src={profile.avatar}></Image>
                                <Header.Content>
                                    <br></br>
                                    <span style={this.styles.username}>
                                        {profile.username}
                                    </span>
                                </Header.Content>
                            </Header>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <br></br>
                            <UserInfo {...profile}></UserInfo>
                            <br></br>
                            <br></br>
                            <Divider></Divider>
                            <br></br>
                            <UserStates {...profile}></UserStates>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}
