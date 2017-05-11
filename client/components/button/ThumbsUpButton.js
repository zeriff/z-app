import React from 'react';
import {connect} from 'react-redux';
import {createLike, deleteLike, like_status} from '../../actions/Like';

class ThumbsUpButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            likes: this.props.riff.likes,
            loading: false
        }
        this.toggle = this
            .toggle
            .bind(this);
        this.like = this
            .like
            .bind(this);
        this.removeLike = this
            .removeLike
            .bind(this);

    }

    componentDidMount() {
        let me = this;
        like_status(this.props.riff._id).then(function (res) {
            me.setState({liked: res.liked, likes: res.count});
        });
    }

    toggle() {
        this.setState({
            liked: !this.state.liked
        });
    }

    like() {
        let me = this;
        me.setState({loading: true})
        this.toggle();
        createLike(this.props.riff._id).then(function (res) {
            me.setState({likes: res.riff.likes, loading: false});
        });
    }

    removeLike() {
        let me = this;
        me.setState({loading: true})
        this.toggle();
        deleteLike(this.props.riff._id).then(function (res) {
            me.setState({likes: res.riff.likes, loading: false});
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <i className="thumbs up large yellow icon loading" onClick={this.removeLike}></i>
                    {this.state.likes}
                </div>
            )
        }

        if (this.state.liked) {
            return (
                <div>
                    <i className="thumbs up large yellow icon" onClick={this.removeLike}></i>
                    {this.state.likes}
                </div>
            )

        } else {
            return (
                <div>
                    <i className="thumbs outline up large yellow icon" onClick={this.like}></i>
                    {this.state.likes}
                </div>
            )
        }

    }
}

export default ThumbsUpButton;