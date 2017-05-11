import React from 'react';
import Modal from 'react-modal';
import {ModalStyles} from './Style';
import Cropper from 'react-cropper';
import {Grid, Button, Divider} from 'semantic-ui-react';
import {updateProfilePic} from '../../actions/profile';
import {connect} from 'react-redux';
import * as actions from '../../actions/profile';

class ProfilepicUploader extends React.Component {

    constructor(props) {
        super(props);

        this._resetHandler = this
            ._resetHandler
            .bind(this);

        this._onNext = this
            ._onNext
            .bind(this);

    }
    state = {
        cropResult: ''
    }
    styles = {
        imagezone: {
            height: "450px",
            width: "100%",
            left: "-50%"
        }
    }

    buildCloseButton() {
        return (
            <div
                onClick={this.props.closeModal}
                style={{
                position: 'fixed',
                right: '20px',
                top: '20px',
                fontSize: '3em',
                cursor: "pointer",
                fontWeight: 200,
                color: 'white'
            }}>X</div>
        )
    }
    _onNext() {
        this.crop();
    }
    crop() {
        if (typeof this.p_cropper.getCroppedCanvas() === 'undefined') {
            return;
        }

        let result = this
            .p_cropper
            .getCroppedCanvas()
            .toDataURL();

        this
            .props
            .updateProfilePic(result);
    }

    _resetHandler() {
        this.setState({src: ''})
        this
            .props
            .closeModal();
    }
    renderContent() {
        if (this.props.src) {
            return (
                <div>
                    <Grid centered>
                        <Grid.Column width={6}>
                            <h5
                                className="ui header"
                                style={{
                                color: "white"
                            }}>
                                Preview
                            </h5>
                            <Divider></Divider>
                            <div
                                className="img-preview ui circular image"
                                style={{
                                overflow: 'hidden',
                                width: '100%',
                                height: 300
                            }}/>
                            <Divider></Divider>
                            <Button onClick={this._resetHandler} color="red">Cancel</Button>
                            <Button onClick={this._onNext}>Upload</Button>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Cropper
                                style={this.styles.imagezone}
                                preview=".img-preview"
                                guides={true}
                                aspectRatio={1 / 1}
                                src={this.props.src}
                                ref={p_cropper => {
                                this.p_cropper = p_cropper;
                            }}></Cropper>
                        </Grid.Column>
                    </Grid>
                </div>
            );
        }
        return "";
    }

    render() {
        return (
            <Modal
                isOpen={this.props.open}
                onRequestClose={this.props.closeModal}
                style={ModalStyles}
                contentLabel="Modal">
                {this.buildCloseButton()}
                {this.renderContent()}
            </Modal>
        );
    }

}

export default connect(null, actions)(ProfilepicUploader);