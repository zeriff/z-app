import React from 'react';
import Dropzone from 'react-dropzone';
import storageMgr from '../../utils/storagemanager';
import axios from 'axios';
import Cropper from 'react-cropper';
import {Grid, Segment, Divider, Container, Modal} from 'semantic-ui-react'
import UploadForm from './upload_form';

const src = '';

class FileCropper extends React.Component {

    componentDidMount() {}

    constructor(props) {
        super(props);
        this.state = {
            src,
            cropResult: null,
            uploadform: false
        };
        this.cropImage = this.cropImage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.useDefaultImage = this.useDefaultImage.bind(this);
    }

    onChange(e) {

        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({src: reader.result});
        };
        reader.readAsDataURL(files[0]);
    }

    cropImage() {

        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.setState({cropResult: this.cropper.getCroppedCanvas().toDataURL()});
        this.setState({uploadform: true});
    }

    useDefaultImage() {
        this.setState({src});
    }
    toggleModal() {
        this.setState({
            uploadform: !this.state.uploadform
        });
    }
    render() {
        return (
            <Container textAlign="center">
                <Grid stackable>
                    <Grid.Row columns={2}>
                        <Grid.Column width={8}>
                            <div className="ui segment">
                                <Cropper style={{
                                    height: 450,
                                    width: '100%'
                                }} preview=".img-preview" guides={true} src={this.state.src} ref={cropper => {
                                    this.cropper = cropper;
                                }}/>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={8}>

                            <span>
                                <label htmlFor="pin_image" className="ui icon button">
                                    <i className="file icon"></i>
                                    Select Image
                                </label>
                                <input style={{
                                    display: 'none'
                                }} id="pin_image" ref="in" type="file" accept="image/*" onChange={this.onChange} ref={input => this.inputElement = input}/>

                                <button className="ui button" onClick={this.useDefaultImage}>Reset</button>
                                <button className="ui button" onClick={this.cropImage}>
                                    Crop Image
                                </button>
                            </span>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Modal basic open={this.state.uploadform} closeIcon={true}>
                    <Modal.Content>
                        <UploadForm image={this.state.cropResult} modalCallback={this.toggleModal.bind(this)}></UploadForm>
                    </Modal.Content>
                </Modal>

            </Container>

        )
    }
}

export default FileCropper;
