import React from 'react';

export default class Image extends React.Component {
    render() {
        return (
            <div className="ui fluid centered large image">
                <img src={this.props.image.image_url}></img>
            </div>
        )
    }
}
