import React from 'react';
import ReactDom from 'react-dom';

export default class FileUpload extends React.Component {
    handleFile(e) {
        var reader = new FileReader();
        var file = e.target.files[0];

        if (!file)
            return;

        reader.onload = function(img) {
            ReactDom.findDOMNode(this.refs. in).value = '';
            this.props.handleFileChange(img.target.result);
        }.bind(this);
        reader.readAsDataURL(file);
    }

    render() {
        return (

            <div className="ui centered item">
                <label htmlFor="pin_image" className="ui icon button">
                    <i className="file icon"></i>
                    Open File
                </label>
                <input style={{
                    display: 'none'
                }} id="pin_image" ref="in" type="file" accept="image/*" onChange={this.handleFile.bind(this)}/>
            </div>
        )
    }
}

// %label.ui.icon.button{:for => "pin_image"}
//   %i.file.icon
//   Attach Image
// %input#pin_image{:style => "display:none", :type => "file", :name => "pin[image]"}/ > "file", : name => "pin[image]"
