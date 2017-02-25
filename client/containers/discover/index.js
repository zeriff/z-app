import React from 'react';
import Board from '../../components/entity/board';
import Image from '../../components/entity/image';
import {connect} from 'react-redux';
import SliderBoard from '../../components/entity/sliderboard'
import BoardCollection from '../../components/entity/board_collection';
import {Grid, Segment, Divider} from 'semantic-ui-react'

class Discover extends React.Component {
    componentDidUpdate() {
        masonry.bind("boards", "custom");
        masonry.reload("boards");
    }

    _renderBoards() {
        return this.props.boards.map(function(board) {
            if (board.pins.length > 0) {
                return (
                    <SliderBoard key={Math.random()} boards={board.pins} title={board.title}></SliderBoard>
                )
            }
            return "";
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
export default connect(mapStateToProps)(Discover);
