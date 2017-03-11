import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';
import {
    Container,
    Form,
    Button,
    Checkbox,
    Segment,
    Grid
} from 'semantic-ui-react';

class Signup extends React.Component {
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
                            <div className="pintitle">
                                Set your password
                            </div>
                        </h2>
                        <Form>
                            <Segment stacked>
                                <Form.Field>
                                    <input type="password" name="password" placeholder="Password"></input>
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox name="term" label='I agree to the Terms and Conditions'></Checkbox>
                                </Form.Field>
                                <Button type='submit' color='teal' fluid={true}>Signup</Button>
                            </Segment>
                        </Form>
                    </div>
                </div>
            </Container>
        )
    }
}

export default Signup;
