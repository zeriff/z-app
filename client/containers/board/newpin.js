import React from 'react';
import Dropzone from 'react-dropzone';
import storageMgr from '../../utils/storagemanager';
import axios from 'axios';

class NewPin extends React.Component {
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
                <div key={Math.random()} className="card">
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
        if (this.state.files.length == 0) {
            toastr.error("Please upload image")
            return
        } else {
            var formData = new FormData()
            let image = me.state.files[0];
            formData.append('boards', me.state.boards);
            formData.append('title', me.state.title);
            formData.append('story', me.state.story);
            formData.append('image_url', new Blob(me.state.files));

            axios.post("/api/pins", formData, {
                headers: {
                    "x-access-token": storageMgr.getToken()
                }
            }).then(function(res) {
                toastr.info(res.data.message);
                console.log(res)
            });
        }
    }
    render() {

        return (
            <div className="ui container">
                <h2 className="ui header">
                    New Pin
                </h2>
                <form className="ui form segment" onSubmit={this.onFormSubmit.bind(this)}>
                    <div className="ui two column centered stackable grid">
                        <div className="six wide column">
                            <div className="field" style={{
                                textAlign: 'center'
                            }}>
                                <Dropzone ref="dropzone" onDrop={this.onDrop.bind(this)}>
                                    <div>Drop your image</div>
                                    <div className="ui horizontal divider">Or</div>
                                    <div>click to open</div>
                                </Dropzone>
                                <br></br>
                                <div className="ui link cards">
                                    {this.buildImagePreview()}
                                </div>
                            </div>
                        </div>
                        <div className="ten wide column">
                            <div className="field">
                                <input type="text" name="board" placeholder="Visit Manali" value={this.state.boards} onChange={this.onBoardChange.bind(this)}></input>
                            </div>
                            <div className="field">
                                <input type="text" name="title" placeholder="Visiting my dream" value={this.state.title} onChange={this.onTitleChange.bind(this)}></input>
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

export default NewPin;
