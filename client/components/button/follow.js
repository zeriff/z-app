import React from 'react';
import {Button} from 'semantic-ui-react';
import {StorageManager} from '../../utils';
import {connect} from 'react-redux';
import * as actions from '../../actions/follow';
import {getFollowingStatus} from '../../api/follow';

class Follow extends React.Component {
    constructor(props) {
        super(props);

        this.follow = this
            .follow
            .bind(this);
        this.unfollow = this
            .unfollow
            .bind(this);

        this.state = {
            follow: false
        }
        let me = this;
        if (this.props.follow == undefined) {
            getFollowingStatus(this.props.user_id)
                .then(function (res) {
                    me.setState({follow: res.isFollowing});
                });
        } else {
            this.setState({follow: this.props.isFollowing})
        }
    }
    current_user_id = StorageManager
        .getItem('session')
        .user_id

    follow() {
        this.setState({follow: true});
        this
            .props
            .create_follow(this.props.user_id);
    }
    unfollow() {
        this.setState({follow: false});

        this
            .props
            .delete_follow(this.props.user_id);
    }

    render() {
        if (this.current_user_id == this.props.user_id) {
            return (
                <div></div>
            );
        }
        if (this.state.follow) {
            return (
                <Button basic inverted circular size="small" onClick={this.unfollow}>Following</Button>
            );
        }
        return (
            <Button color="yellow" circular size="small" onClick={this.follow}>Follow</Button>
        );
    }
}

export default connect(null, actions)(Follow);
