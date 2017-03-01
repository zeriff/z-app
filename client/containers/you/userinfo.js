import React from 'react';
import storageMgr from '../../utils/storagemanager';
import {
    Button,
    Header,
    Divider,
    Modal,
    Grid,
    Icon,
    Container
} from 'semantic-ui-react'
import AvatarUploader from '../../components/user/avataruploader';
import UserStates from './userstates';
import {browserHistory} from 'react-router';

//var url = "https://zeriffuploads.s3.amazonaws.com/585804b5a96575905bd7e570/pins/5884c8b9b4c59131652a3031";

export default class UserInfo extends React.Component {

    Logout() {
        storageMgr.removeUser();
        browserHistory.push('/auth');
    }
    render() {
        let userDetails = storageMgr.getUserDetails();
        return (
            <Container>
                <Grid stackable centered>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <br></br>

                        </Grid.Column>
                        <Grid.Column>
                            <div className="userinfo">
                                <Grid.Row>
                                    <Grid.Column>
                                        <div className="ui content">
                                            <div className="ui sub header pintitle">
                                                {userDetails.username}
                                            </div>
                                            Coder & Geek
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Button color='blue'>Follow</Button>
                                        <Button circular color='green' icon='add user'/>
                                        <Button circular color='yellow' icon='inbox'/>
                                        <Button circular color='red' icon='power' onClick={this.Logout}/>
                                    </Grid.Column>
                                </Grid.Row>
                                <Divider></Divider>
                                <Grid.Row>
                                    <UserStates></UserStates>
                                </Grid.Row>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Container>
        );
    }
}
