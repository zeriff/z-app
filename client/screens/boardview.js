import React from 'react';
import Modal from 'react-modal';
import {
    Button,
    Icon,
    Container,
    Segment,
    Divider,
    Loader,
    Dimmer
} from 'semantic-ui-react';
import {Parallax, Background} from 'react-parallax';
import Masonry from 'react-masonry-component';
import Pin from '../components/entity/pin';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class BoardView extends React.Component {

    _renderPins(pins) {
        var me = this;
        return pins.map(function(item) {
            return (
                <Pin key={Math.random()} pin={item}></Pin>
            )
        });
    }

    masonryOptions = {
        transitionDuration: 0
    }

    styes = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#f5f5f5',
            zIndex: '1000'
        },
        content: {
            position: 'absolute',
            color: 'white',
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px',
            border: '0px',
            background: '',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '0px',
            outline: 'none',
            padding: '20px'

        }
    }

    _renderContent() {
        let userboard = this.props.board.userboard;
        let pins = this.props.board.pins;
        if (userboard) {
            return (
                <Container>
                    <div onClick={this.props.closeModal} style={{
                        position: 'fixed',
                        right: '20px',
                        top: '20px',
                        fontSize: '3em',
                        cursor: "pointer",
                        fontWeight: 200,
                        color: "black"
                    }}>X</div>

                    <div style={{
                        paddingRight: '5px',
                        paddingLeft: '5px',
                        paddingBottom: "5px"
                    }}>
                        <div style={{
                            backgroundImage: "url(" + userboard.image_url + ")",
                            height: '580px',
                            width: '100%',
                            backgroundPosition: '10% 30%',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundAttachment: 'fixed'
                        }}>
                            <div className="image-bg">
                                <div className="board-title" style={{
                                    fontSize: '3em'
                                }}>
                                    {userboard.title}
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <div>
                                        <Button icon size="big" circular color="yellow">
                                            <Icon name="plus"></Icon>
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <Masonry elementType={'div'} options={this.masonryOptions} disableImagesLoaded={false} updateOnEachImageLoad={false}>
                        {this._renderPins(pins)}
                    </Masonry>
                </Container>
            )
        }
        return (
            <Dimmer active inverted>
                <div onClick={this.props.closeModal} style={{
                    position: 'fixed',
                    right: '20px',
                    top: '20px',
                    fontSize: '3em',
                    cursor: "pointer",
                    fontWeight: 200,
                    color: "black"
                }}>X</div>
                <Loader>Awesome</Loader>
            </Dimmer>
        );

    }

    render() {
        return (
            <div>
                {this._renderContent()}
            </div>
        )
    }
}

export default BoardView;
