import React from 'react';
import {Statistic} from 'semantic-ui-react'

export default class UserStates extends React.Component {

    items = [
        {
            label: 'Followers',
            value: '23'
        }, {
            label: 'Followings',
            value: '123'
        }, {
            label: 'Memories',
            value: '12'
        }
    ];

    render() {
        let {followers, following, memories} = this.props;
        return (
            <Statistic.Group size="small" inverted widths={3}>
                <Statistic>
                    <Statistic.Label>Followers</Statistic.Label>
                    <Statistic.Value>{followers || 0}</Statistic.Value>
                </Statistic>
                <Statistic>
                    <Statistic.Label>Following</Statistic.Label>
                    <Statistic.Value>{following || 0}</Statistic.Value>
                </Statistic>
                <Statistic>
                    <Statistic.Label>Memories</Statistic.Label>
                    <Statistic.Value>{memories || 0}</Statistic.Value>
                </Statistic>
            </Statistic.Group>
        )
    }
}

// return (<Statistic.Group size={'medium'} inverted inverted items={this.items}/>)
