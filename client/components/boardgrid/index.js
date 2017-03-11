import React from 'react';
import UserBoard from './userboard';

class BoardGrid extends React.Component {
    componentDidUpdate() {
        masonry.bind("boards", "custom");
        masonry.reload("boards");
    }

    _renderBoards() {
        return this.props.boards.map(function(board, index) {
            let no = index / 2 == 0
                ? 1
                : 2;

            return (
                <UserBoard divno={no} key={Math.random()} board={board}></UserBoard>
            )
        });
    }

    render() {
        return (
            <div className="boards" style={{
                margin: "auto"
            }}>
                {this._renderBoards()}
            </div>

        )
    }
}

export default BoardGrid;
