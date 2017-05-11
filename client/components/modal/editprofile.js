import React from "react";
import Modal from 'react-modal';
import {
    Container,
    Form,
    Button,
    Grid,
    Segment,
    Divider,
    Image
} from 'semantic-ui-react';
import * as actions from '../../actions/profile';
import {connect} from 'react-redux';

class EditProfile extends React.Component {
    onFormSubmit(e, data) {
        e.preventDefault();
        if (this.isFormValid(data.formData)) {
            this
                .props
                .editProfile(data.formData);
            this
                .props
                .closeModal();
        }
    }
    state = {
        validateName: true,
        validateProfession: true
    }
    options = [
        {
            key: 'm',
            text: 'Male',
            value: 'male'
        }, {
            key: 'f',
            text: 'Female',
            value: 'female'
        }
    ]
    isFormValid(formData) {
        let v_name = true;
        let v_profession = true;
        if (formData.name == "") {
            v_name = false;
            toastr.error("Name can't be blank");
            return false
        }
        if (formData.profession == "") {
            v_profession = false;
            toastr.error("Profession can't be blank");
            return false;
        }
        return true;
    }
    render() {
        let {profile} = this.props;
        return (
            <Modal
                isOpen={this.props.open}
                onRequestClose={this.props.closeModal}
                style={this.styles}
                contentLabel="Modal">
                <div
                    onClick={this.props.closeModal}
                    style={{
                    position: 'fixed',
                    right: '20px',
                    top: '20px',
                    fontSize: '3em',
                    cursor: "pointer",
                    fontWeight: 200
                }}><Image src="/img/cancel.png" size="mini"/></div>

                <Container>
                    <Grid centered>
                        <Grid.Column
                            width={10}
                            style={{
                            textAlign: 'left'
                        }}>

                            <Divider></Divider>
                            <Form
                                onSubmit={this
                                .onFormSubmit
                                .bind(this)}>
                                <Segment>
                                    <h2 className="ui header">
                                        Edit your profile
                                        <Divider
                                            style={{
                                            borderTop: "2px solid"
                                        }}></Divider>
                                    </h2>

                                    <div
                                        style={{
                                        overflow: "scroll"
                                    }}>
                                        <Form.Input defaultValue={profile.username} label='Username' name="username"></Form.Input>
                                        <Form.Input
                                            defaultValue={profile.name}
                                            label='Name'
                                            name="name"
                                            error={!this.state.validateName}></Form.Input>
                                        <Form.Input
                                            defaultValue={profile.profession}
                                            label='What do you Do?'
                                            name="profession"
                                            error={!this.state.validateProfession}></Form.Input>
                                        <Form.Input
                                            defaultValue={profile.bio}
                                            label='Tell us about your self?'
                                            name="bio"
                                            placeholder="#Travel  #Hiking  #dreamer"></Form.Input>
                                        <Form.Select
                                            label="Gender"
                                            defaultValue={profile.gender}
                                            name="gender"
                                            options={this.options}
                                            placeholder='Gender'></Form.Select>
                                    </div>
                                </Segment>
                                <Button type='submit' floated="right">Save</Button>
                            </Form>

                        </Grid.Column>

                    </Grid>

                </Container>

            </Modal>
        );
    }

    styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: '1000',
            transition: '0.3s ease'
        },
        content: {
            position: 'absolute',
            color: 'white',
            top: '10px',
            left: '10px',
            right: '10px',
            bottom: '10px',
            border: '0px',
            background: '',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '0px',
            outline: 'none',
            padding: '20px',
            transition: '0.3s ease'

        }
    }

}

function mapStateToProps(state) {
    return {profile: state.profile}
}
export default connect(mapStateToProps, actions)(EditProfile);
