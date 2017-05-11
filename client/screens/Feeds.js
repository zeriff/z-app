import React from 'react';
import {connect} from 'react-redux';
import * as profile_actions from '../actions/profile';
import * as discover_actions from '../actions/discover';
import Pin from '../components/entity/pin';
import {Container, Modal, Button, Icon} from 'semantic-ui-react';
import Masonry from 'react-masonry-component';
import {browserHistory as history} from 'react-router';

class Feeds extends React.Component {
    componentDidMount() {

        this
            .props
            .loadMyfeeds();

        this
            .props
            .loadPopular();
    }

    _renderPins() {
        var me = this;
        return this
            .props
            .feeds
            .map(function (item) {
                return (
                    <Pin key={Math.random()} pin={item} _onPinClick={e => console.log("clicked")}></Pin>
                )
            });
    }
    masonryOptions = {
        transitionDuration: 0
    };

    render() {
        var childElements = this._renderPins();
        return (
            <Container>
                <Masonry
                    elementType={'div'}
                    options={this.masonryOptions}
                    disableImagesLoaded={false}
                    updateOnEachImageLoad={true}>
                    {childElements}
                </Masonry>
            </Container>
        )
    }

}

function mapStateToProps(state) {
    return {feeds: state.profile.myfeeds}
}

export default connect(mapStateToProps, {
    ...profile_actions,
    ...discover_actions
})(Feeds);