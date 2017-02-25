import React from 'react';
import {Grid} from 'semantic-ui-react'
export default class UserStates extends React.Component {
    componentDidMount() {}
    render() {

        return (
            <div className="ui container">
                <Grid centered columns={1}>
                    <Grid.Row centered columns={4}>
                        <Grid.Column>
                            <div className="ui mini statistic">
                                <div className="label">
                                    Followers
                                </div>
                                <div className="value">
                                    1319
                                </div>
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <div className="ui mini statistic">
                                <div className="label">
                                    Following
                                </div>
                                <div className="value">
                                    139
                                </div>
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <div className="ui mini statistic">
                                <div className="label">
                                    Memories
                                </div>
                                <div className="value">
                                    763
                                </div>
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <div className="ui mini statistic">
                                <div className="label">
                                    Dreams
                                </div>
                                <div className="value">
                                    78
                                </div>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}
