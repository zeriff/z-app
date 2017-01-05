import React from 'react';

class Board extends React.Component {
    constructor(props) {
        super(props)
    }
    _clickHander() {
        this.props.clickHandler(this.props.board);
    }

    render() {
        return (
            <div className="board">
                <div className="ui fluid raised link card">
                    <a className="image">
                        <img src={this.props.board.image_url} onClick={this._clickHander.bind(this)}></img>
                    </a>
                    <div className="content">
                        <span className="right floated likebutton">
                            <span>
                                <a>
                                    <i className="large heart like red icon"></i>
                                </a>
                                102
                            </span>
                        </span>
                        <div className="pintitle">
                            {this.props.board.title}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Board;
