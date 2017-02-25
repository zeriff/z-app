import React from 'react';

export default class Board extends React.Component {
    render() {
        return (
            <div className="board">
                <div className="ui fluid link piled raised segment">
                    <div className="ui top attached label">
                        <div className="pintitle">
                            {this.props.board.title}
                        </div>
                    </div>
                    <div className="ui fluid image">
                        <a className="ui red right corner label">
                            <i className="add icon"></i>
                        </a>
                        <img src={this.props.board.image_url}></img>
                    </div>
                </div>
            </div>
        )
    }
}
