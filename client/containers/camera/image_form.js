import React from 'react';
import Dropzone from 'react-dropzone';
import storageMgr from '../../utils/storagemanager';
import axios from 'axios';

export default class ImageForm extends React.Component {
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
        if (this.state.files.length == 0) {
            toastr.error("Please upload image")
            Loader.done();
            return
        } else {
            var formData = new FormData()
            let image = me.state.files[0];
            formData.append('boards', me.state.boards);
            formData.append('title', me.state.title);
            formData.append('story', me.state.story);
            formData.append('image', new Blob(me.state.files));

            axios.post("/api/pins", formData, {
                headers: {
                    "x-access-token": storageMgr.getToken()
                }
            }).then(function(res) {
                Loader.done();
                toastr.info(res.data.message);
                console.log(res)
            });
        }
    }
    render() {
        return (
            <div className="ui container">
                <form className="ui form segment" onSubmit={this.onFormSubmit.bind(this)}>
                    <div className="ui two column centered stackable grid">
                        <div className="ten wide column">
                            <div className="field" style={{
                                textAlign: 'center'
                            }}>

                                <Dropzone multiple={false} accept="image/*" className="dropzone" ref="dropzone" onDrop={this.onDrop.bind(this)}>
                                    {this.buildImagePreview()}
                                </Dropzone>

                                <br></br>
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
