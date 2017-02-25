import React from 'react';

class Pin extends React.Component {
    render() {
        return (
            <div className="pin">
                <div className="ui fluid raised link card">
                    <a className="image">
                        <img src={this.props.pin.image_url}></img>
                    </a>
                    <div className="content">
                        <div className="pintitle">
                            {this.props.pin.title}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Pin;
