import React from 'react';
import Modal from 'react-modal';
import {
    Container,
    Input,
    Grid,
    Button,
    Image,
    Icon
} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import * as actions from '../actions/Riff';
import {connect} from 'react-redux';

class RiffUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titlePresent: false,
            title: '',
            files: [],
            src: '',
            cropResult: ''
        }

        this._resetHandler = this
            ._resetHandler
            .bind(this);
        this._renderControls = this
            ._renderControls
            .bind(this);
        this._onNext = this
            ._onNext
            .bind(this);
        this._onDrop = this
            ._onDrop
            .bind(this);
        this._titleChange = this
            ._titleChange
            .bind(this);
    }
    _titleChange(e) {
        this.setState({title: e.target.value, titlePresent: false});
    }
    _resetHandler() {
        this.setState({src: ''})

    }

    cropImage() {

        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.setState({
            cropResult: this
                .cropper
                .getCroppedCanvas()
                .toDataURL()
        });
    }
    _onNext() {
        if (this.state.title == "") {
            toastr.error("Please Enter the title");
            this.setState({titlePresent: true})
            return;
        }
        this.cropImage();
    }
    _renderControls() {
        if (this.state.src) {
            return (
                <div>
                    <Button color="yellow" basic floated="right" onClick={this._onNext}>Next</Button>
                    <Button color="blue" basic floated="right" onClick={this._resetHandler}>Reset</Button>
                </div>
            )
        }
    }
    upload() {
        let data = {
            title: this.state.title,
            image: this.state.cropResult
        }
        this
            .props
            .uploadRiff(data);
        this
            .props
            .closeModal();
    }

    _renderContent() {
        let cropper_el = '';
        if (this.state.src) {
            cropper_el = (
                <div style={this.styles.overlap}>
                    <Cropper
                        style={this.styles.imagezone}
                        preview=".img-preview"
                        guides={true}
                        src={this.state.src}
                        ref={cropper => {
                        this.cropper = cropper;
                    }}></Cropper>
                </div>
            );
        }

        let zone = '';
        if (!this.state.src) {
            zone = (
                <div style={this.styles.overlap}>
                    <Dropzone
                        ref="dropzone"
                        onDrop={this._onDrop}
                        activeClassName="dpzone"
                        className="dpzone">
                        <div>
                            <h5 className="ui header">
                                <p
                                    style={{
                                    paddingTop: '70%'
                                }}>
                                    Click here Or Drag & Drop
                                </p>
                            </h5>
                        </div>
                    </Dropzone>
                </div>
            );
        }

        let dropNcrop = '';
        let uplodForm = '';
        if (this.state.cropResult == '') {

            dropNcrop = (
                <Grid.Column width={8}>
                    <div
                        style={{
                        paddingTop: '5%',
                        paddingBottom: '2%'
                    }}>
                        <h5 className="ui header inverted">
                            Add your Riff
                        </h5>
                        {zone}
                        {cropper_el}
                        <Input
                            style={{
                            paddingTop: '6.3px'
                        }}
                            error={this.state.titlePresent}
                            placeholder="Add your title here"
                            fluid
                            className="lemontext"
                            value={this.state.title}
                            onChange={this._titleChange}></Input>
                    </div>
                    {this._renderControls()}
                </Grid.Column>
            )
        } else {
            uplodForm = (
                <Grid.Column width={6}>
                    <div className="ui fluid card">
                        <a className="image">
                            <img src={this.state.cropResult}></img>
                        </a>
                        <div className="content">
                            <div className="pintitle">
                                {this.state.title}
                            </div>
                        </div>
                    </div>
                    <Button onClick={e => this.setState({cropResult: ''})}>Back</Button>
                    <Button onClick={e => this.upload()}>Upload</Button>
                </Grid.Column>
            );
        }

        return (
            <Container>
                <Grid centered stackable>
                    {dropNcrop}
                    {uplodForm}
                </Grid>
            </Container>
        );
    }
    _onDrop(files) {
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({src: reader.result});
        };
        reader.readAsDataURL(files[0]);
        this.setState({files: files});
    }
    onOpenClick() {
        this
            .refs
            .dropzone
            .open();
    }

    render() {
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
                }}>
                    <Icon name="cancel" inverted></Icon>
                </div>
                {this._renderContent()}
            </Modal>
        )
    }
    styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: '1000'
        },
        content: {
            position: 'absolute',
            color: 'black',
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
            padding: '20px'
        },
        imgContent: {
            width: "100%"
        },
        overlap: {},
        imagezone: {
            height: "450px",
            width: "100%",
            left: "-50%"
        }
    }
}

export default connect(null, actions)(RiffUploader);
