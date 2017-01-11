import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Board from './board';
import axios from 'axios';
import storageMgr from '../../utils/storagemanager';
import {browserHistory} from 'react-router';
import PinModal from './pins_modal';
import * as actions from '../../actions';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.contextTypes = {
            router: React.PropTypes.func.isRequired
        };
    }
    componentDidMount() {
        var userdetails = storageMgr.getUserDetails();
        if (userdetails != null) {
            setTimeout(function() {
                this.context.router.transitionTo('/');
            }, 500);
        }
    }

    componentDidUpdate() {
        masonry.bind("boards", "board");
        masonry.reload("boards");
    }

    _pinclickhandler(board) {
        let me = this;
        axios.get('/api/pins/board/' + board.title, {
            headers: {
                "x-access-token": storageMgr.getToken()
            }
        }).then(function(res) {
            me.props.loadPins(res.data.pins);
            if (res.data.pins.length > 0) {
                $('.ui.basic.modal').modal('show');
                setTimeout(function() {
                    masonry.bind("pins", "pin");
                    masonry.reload("pins");
                }, 500);

            } else {
                toastr.info("No pins found for this board");
            }
        });
    }

    _renderBoards() {
        var me = this;
        return this.props.boards.map(function(item) {
            return (
                <Board key={Math.random()} board={item} clickHandler={me._pinclickhandler.bind(me)}></Board>
            )
        });
    }

    render() {

        return (
            <div className="home">
                <div className="boards transitions-enabled" style={{
                    margin: "auto"
                }}>
                    {this._renderBoards()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {boards: state.boards}
}
export default connect(mapStateToProps, actions)(Home);
