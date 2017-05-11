import React from 'react';
import ThumbsUpButton from '../../components/button/ThumbsUpButton';

class Pin extends React.Component {
    styles = {
        username: {
            fontSize: '16px',
            fontWeight: '300',
            paddingLeft: '10px',
            paddingRight: '10px',
            fontFamily: '"Raleway", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif'
        },
        overlayContent: {
            color: 'white',
            position: 'absolute',
            bottom: '10px',
            right: '10px'
        }
    }
    onPinClick() {
        this
            .props
            ._onPinClick(this.props.pin);
    }

    render() {
        return (
            <div className="pin">
                <div className="ui fluid yellow card">
                    <a className="image">
                        <img src={this.props.pin.image.thumb}></img>
                        <span
                            className="image-span"
                            onClick={e => alert(this.props.pin._creator.username)}>
                            <h2 style={this.styles.username}>{this.props.pin._creator.username}</h2>
                        </span>
                        <div
                            className="card-overlay"
                            onClick={this
                            .onPinClick
                            .bind(this)}>
                            <div style={this.styles.overlayContent}>
                                <ThumbsUpButton riff={this.props.pin}></ThumbsUpButton>
                            </div>
                        </div>
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
