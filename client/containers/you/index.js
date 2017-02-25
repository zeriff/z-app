import React from 'react';
import Board from '../../components/entity/board';
import {connect} from 'react-redux';
import UserInfo from './userinfo';
import ReactDom from 'react-dom';

class You extends React.Component {
    state = {
        cropperOpen: false,
        img: null,
        croppedImg: "http://www.fillmurray.com/400/400"
    };

    constructor(props) {
        super(props);
    }
    componentDidUpdate() {
        masonry.bind("boards", "board");
        masonry.reload("boards");
    }

    componentDidMount() {}

    _renderBords() {
        return this.props.boards.map(function(board) {
            return (
                <Board key={Math.random()} board={board}></Board>
            )
        });
    }
    handleFileChange(dataURI) {
        this.setState({img: dataURI, croppedImg: this.state.croppedImg, cropperOpen: true});
    }
    handleRequestHide() {
        this.setState({cropperOpen: false});
        masonry.reload("boards");
    }
    handleCrop(dataURI) {
        this.setState({cropperOpen: false, img: null, croppedImg: dataURI});
        masonry.reload("boards");
    }
    render() {
        return (
            <div>
                <UserInfo></UserInfo>
                <br></br>
                <div></div>
                <div className="ui horizontal divider">
                    <div className="ui secondary big menu tabs">
                        <a className="item active" data-tab="first">Collection</a>
                        <a className="item" data-tab="second">Private</a>
                        <a className="item" data-tab="third">Invites</a>
                    </div>
                </div>
                <div className="boards transitions-enabled" style={{
                    margin: "auto"
                }}>
                    {this._renderBords()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {boards: state.userboards}
}
export default connect(mapStateToProps)(You);
