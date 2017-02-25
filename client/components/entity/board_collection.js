import React from 'react';
import {Grid, Segment, Divider} from 'semantic-ui-react'

export default class BoardCollection extends React.Component {

    renderSubBoards() {
        return this.props.boards.map(function(pin) {
            return (
                <Grid.Column>
                    <img className="ui centered image fluid" src={pin.image_url}></img>
                </Grid.Column>
            )
        });
    }

    render() {
        let pin = this.props.boards.pop();
        return (
            <div className="ui container">
                <Segment>
                    <Grid stackable>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <img className="ui centered image fluid" src={pin.image_url}></img>
                            </Grid.Column>
                            <Grid.Column>
                                <Grid>
                                    <Grid.Row columns={2}>
                                        {this.renderSubBoards()}
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <div className="ui bottom attached label">
                        <div className="pintitle">
                            {this.props.title}
                        </div>
                    </div>
                </Segment>
            </div>
        );
    }
}
