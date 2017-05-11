import React from 'react';
import {connect} from 'react-redux';
import Masonry from 'react-masonry-component';
import {Icon, Button, Image} from 'semantic-ui-react';
import Switch from '../components/button/Switch';
import * as actions from '../actions/profile';
import InviteButton from '../components/button/InviteButton';

class PublicProfile extends React.Component {
    constructor(props) {

        super(props);
        this.onBoardClick = this
            .onBoardClick
            .bind(this);

    }

    componentDidMount() {
        let id = this.props.routeParams.id
        this
            .props
            .fetchUserBoards(id);
    }
    styles = {
        username: {
            fontSize: '16px',
            fontWeight: '300',
            paddingLeft: '10px',
            paddingRight: '10px',
            fontFamily: '"Raleway", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif'
        },
        overlayContent: {
            color: 'white',
            position: 'absolute',
            bottom: '10px',
            right: '10px'
        },
        boardSettings: {
            position: 'absolute',
            right: '36px'
        }
    }

    onBoardClick() {}

    masonryOptions = {
        transitionDuration: 1
    };

    _renderBoards() {
        let me = this;
        return this
            .props
            .boards
            .map(function (board) {
                return (
                    <div
                        key={Math.random()}
                        className="custom"
                        style={{
                        width: '50%'
                    }}>
                        <div className="ui fluid yellow card">
                            <a className="image">
                                <img src={board.image_url}></img>
                                <div className="image-overlay overlay-div">
                                    <div className="overlay-div">
                                        <div style={me.styles.boardSettings}>
                                            <div className="light-overlay">
                                                <Switch private={false} boardId={board._id}></Switch>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        onClick={e => alert("Div click")}
                                        style={{
                                        position: 'absolute',
                                        height: '100%',
                                        width: "100%"
                                    }}>
                                        <h2 className="board-title">{board.title}</h2>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                )
            });
    }
    render() {
        return (
            <Masonry
                elementType={'div'}
                options={this.masonryOptions}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}>
                {this._renderBoards()}
            </Masonry>
        );
    }
}

function mapStateToProps(state) {
    return {boards: state.profile.userboards}
}

export default connect(mapStateToProps, actions)(PublicProfile);