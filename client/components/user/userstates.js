import React from 'react';
import {Statistic} from 'semantic-ui-react'
import FollowStates from '../modal/FollowStates';
import {Link} from 'react-router';

export default class UserStates extends React.Component {
    state = {
        followOpen: false,
        tab: 1,
        follow: []
    }
    _openFollowModal(tab) {
        this.setState({followOpen: true, tab});
    }
    _closeFollowModal() {
        this.setState({followOpen: false});
    }

    styles = {
        label: {
            fontSize: '1.6em',
            fontWeight: '200',
            textTransform: 'capitalize',
            fontFamily: '"Raleway", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif'
        },
        state: {
            margin: "0 0 1em 0"
        },
        lemon: {
            paddingTop: "25px",
            fontFamily: 'lemonmilk'
        }
    }

    render() {
        let {followers, followings, memories} = this.props.states;
        return (
            <div>
                <FollowStates
                    profile={this.props}
                    open={this.state.followOpen}
                    closeModal={this
                    ._closeFollowModal
                    .bind(this)}
                    tab={this.state.tab}></FollowStates>

                <Statistic inverted onClick={e => this._openFollowModal(1)}>
                    <Statistic.Label style={this.styles.label}>Fans</Statistic.Label>
                    <Statistic.Value style={this.styles.lemon}>{followers.length || 0}</Statistic.Value>
                </Statistic>
                <Statistic inverted>
                    <Statistic.Label style={this.styles.label}>Riffs</Statistic.Label>
                    <Statistic.Value style={this.styles.lemon}>{memories.length || 0}</Statistic.Value>
                </Statistic>
            </div>
        )
    }
}

/*<Statistic inverted onClick={e => this._openFollowModal(2)}>
                    <Statistic.Label style={this.styles.label}>Following</Statistic.Label>
                    <Statistic.Value style={this.styles.lemon}>{followings.length || 0}</Statistic.Value>
                </Statistic>
                <Statistic inverted>
                    <Statistic.Label style={this.styles.label}>Memories</Statistic.Label>
                    <Statistic.Value style={this.styles.lemon}>{memories.length || 0}</Statistic.Value>
                </Statistic>*/
