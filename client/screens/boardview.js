import React from 'react';
import {connect} from 'react-redux';
import {Icon, Menu, Container, Button} from 'semantic-ui-react'
import * as actions from '../actions';
import axios from 'axios';
import storageMgr from '../utils/storagemanager';
import _ from 'lodash'
import Pin from '../components/entity/pin';
import {browserHistory} from 'react-router';

class BoardView extends React.Component {
    componentDidMount() {
        let me = this;
        var userdetails = storageMgr.getUserDetails()
        if (userdetails == null) {
            browserHistory.push("/auth");
            return
        } else {
            axios.get('/api/userboards/' + me.props.location.query.id, {
                headers: {
                    "x-access-token": storageMgr.getToken()
                }
            }).then(function(res) {
                me.props.showBoard(res.data);
            });
        }
    }
    componentDidUpdate() {
        masonry.bind("pins", "pin");
        masonry.reload("pins");
    }
    _renderPins() {
        var me = this;
        if (this.props.board.pins != undefined) {
            return this.props.board.pins.map(function(item) {
                return (
                    <Pin key={Math.random()} pin={item}></Pin>
                )
            });
        }
        return "";

    }
    render() {
        let image_url = "";
        let title = "";
        if (!_.isEmpty(this.props.board)) {
            image_url = this.props.board.userboard.image_url;
            title = this.props.board.userboard.title;
        }
        return (
            <div>
                <Menu className="pinview" fixed="top" borderless={true}>
                    <Container>
                        <Menu.Menu>
                            <Menu.Item onClick={browserHistory.goBack}>
                                <Icon name="left chevron" size={"big"}></Icon>
                            </Menu.Item>
                        </Menu.Menu>
                        <Menu.Menu position={'right'}>
                            <Menu.Item>
                                <Button icon circular color="yellow">
                                    <Icon name="plus" size={"large"}></Icon>
                                </Button>
                            </Menu.Item>
                        </Menu.Menu>
                    </Container>
                </Menu>
                <Container className="board_image">
                    <div className="pinview-bg" style={{
                        backgroundImage: "url(" + image_url + ")"
                    }}>
                        <div className="bg-text">
                            {title}
                        </div>
                    </div>
                </Container>
                <div className="pins" style={{
                    margin: "auto"
                }}>
                    {this._renderPins()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {board: state.board}
}

export default connect(mapStateToProps, actions)(BoardView);
