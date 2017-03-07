import React from 'react';
import {connect} from 'react-redux';
import Pin from '../components/entity/pin';
import * as actions from '../actions';

class Home extends React.Component {
    componentDidUpdate() {
        masonry.bind("pins", "pin");
        masonry.reload("pins");
    }

    _renderPins() {
        var me = this;
        return this.props.pins.map(function(item) {
            return (
                <Pin key={Math.random()} pin={item}></Pin>
            )
        });
    }

    render() {

        return (
            <div className="pins" style={{
                margin: "auto"
            }}>
                {this._renderPins()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {pins: state.pins}
}
export default connect(mapStateToProps, actions)(Home);
