import React from 'react';
import {connect} from 'react-redux';
import Board from './board';

class PinModal extends React.Component {

    constructor(props) {
        super(props);
    }

    _renderPins() {
        return this.props.pins.map(function(item) {
            return (
                <div className="pin">
                    <div className="ui fluid raised link card">
                        <a className="image">
                            <img src={item.image_url}></img>
                        </a>
                        <div className="content">
                            <span className="right floated likebutton">
                                <span>
                                    <a>
                                        <i className="large heart like red icon"></i>
                                    </a>
                                    102
                                </span>
                            </span>
                            <div className="pintitle">
                                {item.title}
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
    }

    render() {
        return (
            <div className="ui basic long modal">
                <div className="actions">
                    <div className="ui cancel button">Close</div>
                </div>
                <div className="pins transitions-enabled">
                    {this._renderPins()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {pins: state.pins}
}

export default connect(mapStateToProps)(PinModal);
