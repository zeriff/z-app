import React from 'react';
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
            email: ""
        }
    }
    onEmailChange(e) {
        this.setState({email: e.target.value})
    }
    onPasswordChange(e) {
        this.setState({password: e.target.value})
    }
    responseGoogle(res) {}
    render() {
        return (
            <Container>
                <div className="ui middle aligned center aligned grid">
                    <div className="column" style={{
                        maxWidth: '450px',
                        paddingTop: '20%'
                    }}>
                        <Form onSubmit={this.onFormSubmit}>
                            <Segment stacked>
                                <Form.Field>
                                    <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.onEmailChange.bind(this)}/>
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
