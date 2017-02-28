import React from 'react';
import axios from 'axios';
import storageMgr from '../../utils/storagemanager';
import {browserHistory} from 'react-router';
import GoogleLogin from 'react-google-login';
import {
    Container,
    Form,
    Button,
    Checkbox,
    Segment,
    Grid
} from 'semantic-ui-react';

const g_id = "36528941489-n0uf3vr0uhrtev3p2c16revfm1cflj72.apps.googleusercontent.com";

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
    }

    onFormSubmit(e, data) {
        var me = this;
        e.preventDefault();

        Loader.setLoading();
        axios.post("/api/auth", data.formData).then(function(res) {
            if (res.data.success) {
                storageMgr.addUserDetails(res.data.userDetails);
                browserHistory.push("/");
                toastr.info(res.data.message);
            }
            Loader.done();
        });
    }

    onUsernameChange(e) {
        this.setState({username: e.target.value})
    }
    onPasswordChange(e) {
        this.setState({password: e.target.value})
    }
    responseGoogle(res) {
        let me = this;
        axios.post("/api/users", res).then(function(res) {
            if (res.data.new == true) {
                browserHistory.push("/auth/signup?id=" + res.data.user_id)
            } else {
                me.setState({username: res.data.username})
                toastr.info(res.data.message);
            }
        });
    }
    usenameOnChange(e) {
        this.setState({username: e.target.value});
    }
    render() {
        return (
            <Container>
                <div className="ui middle aligned center aligned grid">
                    <div className="column" style={{
                        maxWidth: '450px'
                    }}>
                        <h2 className="ui image header" style={{
                            paddingTop: '30%'
                        }}>
                            <div className="content">
                                <div className="pintitle">
                                    Log-in
                                </div>
                            </div>
                        </h2>

                        <Form onSubmit={this.onFormSubmit}>
                            <Segment stacked>
                                <Form.Field>
                                    <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.usenameOnChange.bind(this)}/>
                                </Form.Field>
                                <Form.Field>
                                    <input type="password" name="password" placeholder="Password"/>
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox name="term" label='I agree to the Terms and Conditions'/>
                                </Form.Field>
                                <Button type='submit' color='teal' fluid={true}>Login</Button>
                            </Segment>
                        </Form>

                        <div className="ui horizontal divider">
                            Or Signup with
                        </div>
                        <GoogleLogin className="ui circular google plus icon button" clientId={g_id} onSuccess={this.responseGoogle.bind(this)} onFailure={this.responseGoogle.bind(this)}>
                            <i className='google plus icon'></i>
                        </GoogleLogin>

                    </div>
                </div>
            </Container>
        )
    }
}

export default SignIn;
