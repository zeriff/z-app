import React from 'react';
import {
    Checkbox,
    Form,
    Input,
    Select,
    Container,
    Button
} from 'semantic-ui-react'
import {connect} from 'react-redux';
import * as actions from '../actions/profile'

class EditProfile extends React.Component {
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

    intrests = [
        {
            key: 'm',
            text: 'Music',
            value: 'Music'
        }, {
            key: 'T',
            text: 'Travel',
            value: 'Travel'
        }
    ]

    onFormSubmit(e, data) {
        e.preventDefault();
        if (this.isFormValid(data.formData)) {
            this.props.editProfile(data.formData);
        }
    };

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
            <Container>
                <Form onSubmit={this.onFormSubmit.bind(this)}>
                    <Form.Input defaultValue={profile.name} label='Name' name="name" error={!this.state.validateName}></Form.Input>
                    <Form.Input defaultValue={profile.profession} label='Profession' name="profession" error={!this.state.validateProfession}></Form.Input>
                    <Form.Input defaultValue={profile.bio} label='Bio' name="bio" placeholder="#Travel  #Hiking  #dreamer"></Form.Input>
                    <Form.Select defaultValue={profile.gender} name="gender" options={this.options} placeholder='Gender'></Form.Select>
                    <Button type='submit'>Submit</Button>
                </Form>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {profile: state.profile}
}

export default connect(mapStateToProps, actions)(EditProfile);
