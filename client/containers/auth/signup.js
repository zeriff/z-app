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
import storageMgr from '../../utils/storagemanager';

class Signup extends React.Component {
    onFormSubmit(e, data) {
        e.preventDefault()
        if (data.formData.term == true) {
            Loader.setLoading();
            axios.post("/api/users/done", {
                user_id: this.props.location.query.id,
                password: data.formData.password,
                term: data.formData.term
            }).then(function(res) {
                if (res.data.success) {
                    storageMgr.addUserDetails(res.data.userDetails);
                    browserHistory.push("/");
                    toastr.info(res.data.message);
                } else {
                    toastr.error(res.data.message);
                }
            });
        } else {
            toastr.error("Please accespt terms & Conditions");
        }

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
                            <div className="pintitle">
                                Set your password
                            </div>
                        </h2>
                        <Form onSubmit={this.onFormSubmit.bind(this)}>
                            <Segment stacked>
                                <Form.Field>
                                    <input type="password" name="password" placeholder="Password"/>
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox name="term" label='I agree to the Terms and Conditions'/>
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
