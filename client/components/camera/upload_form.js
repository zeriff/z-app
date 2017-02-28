import React from 'react';
import Dropzone from 'react-dropzone';
import storageMgr from '../../utils/storagemanager';
import axios from 'axios';
import {browserHistory} from 'react-router';

export default class UploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            story: "",
            boards: "",
            files: []
        }
    }

    onTitleChange(e) {
        this.setState({title: e.target.value});
    }
    onStoryChange(e) {
        this.setState({story: e.target.value})
    }
    onDrop(files) {
        this.setState({files: files});
    }
    onBoardChange(e) {
        this.setState({boards: e.target.value})
    }
    buildImagePreview() {
        return this.state.files.map(function(file) {
            return (
                <div key={Math.random()} className="ui fluid card">
                    <div className="image">
                        <img className="ui small image" src={file.preview}></img>
                    </div>
                </div>
            )
        })
    }

    onFormSubmit(e) {
        let me = this;
        e.preventDefault();
        Loader.setLoading();
        if (this.state.files.length == 1) {
            toastr.error("Please upload image")
            Loader.done();
            return
        } else {
            var formData = new FormData()
            let image = me.state.files[0];
            formData.append('boards', me.state.boards);
            formData.append('title', me.state.title);
            formData.append('story', me.state.story);
            formData.append('image', this.dataURItoBlob(this.props.image));

            axios.post("/api/pins", formData, {
                headers: {
                    "x-access-token": storageMgr.getToken()
                }
            }).then(function(res) {
                Loader.done();
                toastr.info(res.data.message);
                browserHistory.push("/");
                this.props.modalCallback();
                console.log(res)
            });
        }
    }
    dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        var blob = new Blob([ab], {type: mimeString});
        return blob;

        // Old code
        // var bb = new BlobBuilder();
        // bb.append(ab);
        // return bb.getBlob(mimeString);
    }

    render() {
        console.log(this.props.image);
        return (
            <div className="ui container">
                <form className="ui form" onSubmit={this.onFormSubmit.bind(this)}>
                    <div className="ui two column centered stackable grid">
                        <div className="eight wide column">
                            <div className="ui segment">
                                <img className="ui fluid image" src={this.props.image} alt="cropped image"/>
                            </div>
                        </div>
                        <div className="six wide column">
                            <div className="field">
                                <input type="text" name="board" placeholder="Your Dream Board" value={this.state.boards} onChange={this.onBoardChange.bind(this)}></input>
                            </div>
                            <div className="field">
                                <input type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.onTitleChange.bind(this)}></input>
                            </div>
                            <div className="field">
                                <input type="text" name="description" placeholder="Describe your story" value={this.state.story} onChange={this.onStoryChange.bind(this)}></input>
                            </div>
                            <button type="submit" className="ui primary submit button">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
