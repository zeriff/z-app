import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/discover';
import _ from 'lodash';
import {Container, Grid, Menu, Divider} from 'semantic-ui-react';
import {StickyContainer, Sticky} from 'react-sticky';
import {browserHistory} from 'react-router';
import Slider from 'react-slick';

class Discover extends React.Component {
    handleItemClick = (e, {name, display}) => {
        this.setState({activeItem: display});
        if (display == 'feeds') {
            display = "discover";
        }
        browserHistory.push("/" + display);
    }
    state = {
        activeItem: 'feeds'
    }

    componentDidMount() {
        switch (this.props.location.pathname) {
            case "/discover":
            case "/feeds":
                this.setState({activeItem: "feeds"});
                break;
            case "/popular":
                this.setState({activeItem: "popular"});
                break;
            default:
                browserHistory.push("/discover");
        }
    }

    renderEvents() {
        if (this.props.feeds.length == 0) {
            return (
                <div></div>
            )
        }
        return this
            .props
            .feeds
            .slice(1)
            .map(function (item) {
                return item
                    .riffs
                    .map(function (r) {
                        return (
                            <div
                                style={{
                                width: '210px',
                                height: '240px',
                                backgroundImage: 'url(' + r.image.thumb + ')',
                                backgroundSize: 'cover'
                            }}>
                                <span className="image-overlay"></span>
                            </div>
                        )
                    })
            })
    }
    render() {
        var settings = {
            dots: true,
            infinite: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000
        }
        const {activeItem} = this.state;
        return (
            <span>
                <div
                    className="pintitle"
                    style={{
                    top: '-5px',
                    fontSize: '18px',
                    paddingTop: '10px',
                    position: 'relative',
                    height: "40px",
                    background: '#FFFC00'
                }}>
                    Events Around you
                </div>
                <div
                    style={{

                    position: "relative",
                    top: "-4.6px"
                }}>

                    <Slider {...settings}>
                        {this.renderEvents()}
                    </Slider>
                </div>
                <Container>
                    <StickyContainer>
                        <Sticky
                            stickyStyle={{
                            marginTop: '60px',
                            zIndex: '24'
                        }}>
                            <header
                                style={{
                                marginBottom: '3px'
                            }}>
                                <div
                                    className="ui horizontal divider"
                                    style={{
                                    margin: '0px',
                                    background: '#f5f5f5'
                                }}>

                                    <Menu
                                        pointing
                                        secondary
                                        style={{
                                        borderBottom: "0px"
                                    }}>
                                        <Menu.Item
                                            className="customtabs"
                                            display="feeds"
                                            name='Feeds'
                                            active={activeItem === 'feeds'}
                                            onClick={this.handleItemClick}/>

                                        <Menu.Item
                                            className="customtabs"
                                            display="popular"
                                            name='Popular'
                                            active={activeItem === 'popular'}
                                            onClick={this.handleItemClick}/>
                                    </Menu>

                                </div>

                            </header>
                        </Sticky>
                        {this.props.children}
                    </StickyContainer>
                </Container>
            </span>
        )
    }
}

function mapStateToProps(state) {
    return {feeds: state.discover.popular}
}
export default connect(mapStateToProps, actions)(Discover);

/*<div
                    style={{
                    display: 'flex',
                    position: "relative",
                    top: "-4.6px"
                }}>
                    {this.renderEvents()}
                </div>*/