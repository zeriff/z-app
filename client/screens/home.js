import React from 'react';
import {connect} from 'react-redux';
import Pin from '../components/entity/pin';
import * as actions from '../actions/home';
import {Container} from 'semantic-ui-react';

class Home extends React.Component {
    componentDidUpdate() {
        masonry.bind("pins", "pin");
        masonry.reload("pins");
    }
    componentDidMount() {
        this.props.loadPins();
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
            <Container>
                <div className="pins" style={{
                    margin: "auto"
                }}>
                    {this._renderPins()}
                </div>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {pins: state.home.pins}
}
export default connect(mapStateToProps, actions)(Home);
