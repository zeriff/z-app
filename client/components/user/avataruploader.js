import React from 'react';
import {Modal, Segment, Image, Header, Button} from 'semantic-ui-react';

export default class AvatarUploader extends React.Component {

    getAvatar() {
        return (
            <img src={this.props.image} className="ui centered circular small image"></img>
        )
    }

    render() {
        return (
            <Modal trigger={this.getAvatar()}>
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src={this.props.image}/>
                    <Modal.Description>
                        <Button color='blue'>Select Image</Button>
                        <Button color='red'>Save</Button>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}
