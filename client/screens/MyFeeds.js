import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/profile';
import Pin from '../components/entity/pin';
import {Container, Modal, Button, Icon} from 'semantic-ui-react';
import Masonry from 'react-masonry-component';
import {browserHistory as history} from 'react-router';
import ThumbsUpButton from '../components/button/ThumbsUpButton';

class MyFeeds extends React.Component {
    componentDidMount() {
        this
            .props
            .loadMyfeeds();
    }
    styles = {

        overlayContent: {
            color: 'white',
            position: 'absolute',
            bottom: '10px',
            right: '10px'
        }
    }
    _renderPins() {
        var me = this;
        return this
            .props
            .feeds
            .map(function (item) {
                return (
                    <div key={Math.random()} className="pin">
                        <div className="ui fluid yellow card">
                            <a className="image">
                                <img src={item.image.thumb}></img>
                                <span className="image-span"></span>
                                <div className="card-overlay">
                                    <div style={me.styles.overlayContent}>
                                        <ThumbsUpButton riff={item}></ThumbsUpButton>
                                    </div>
                                </div>
                            </a>
                            <div className="content">
                                <div className="pintitle">
                                    {item.title}
                                </div>
                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, actions)(MyFeeds);