import React from 'react';
import {Image, Container, Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';

class Popular extends React.Component {
    componentDidMount() {}

    renderRiffs(riffs) {
        return riffs.map(function (riff) {
            return (
                <div
                    key={Math.random()}
                    className="ui image"
                    style={{
                    backgroundImage: "url(" + riff.image.thumb + ")",
                    backgroundColor: "#f5f5f5",
                    backgroundSize: "cover"
                }}></div>
            )
        });
    }

    renderPopular() {
        let me = this;
        return me
            .props
            .popular
            .map(function (item) {
                return (
                    <div key={Math.random()}>
                        <Grid centered>
                            <Grid.Column width={14}>
                                <div
                                    className="ui fluid yellow card"
                                    style={{
                                    backgroundColor: "#f5f5f5"
                                }}>
                                    <div className="description">
                                        <br/>
                                        <Image.Group
                                            className="img-grp"
                                            size='small'
                                            style={{
                                            textAlign: "left",
                                            overflow: "hidden"
                                        }}>
                                            {me.renderRiffs(item.riffs)}
                                        </Image.Group>

                                    </div>
                                    <div
                                        className="content"
                                        style={{
                                        borderTop: "0px",
                                        backgroundColor: " #f5f5f5"
                                    }}>
                                        <div
                                            className="pintitle"
                                            style={{
                                            textAlign: "left"
                                        }}>
                                            {item.title}
                                        </div>
                                    </div>
                                </div>
                            </Grid.Column>
                        </Grid>
                    </div>
                )
            });
    }

    render() {
        return (
            <Container>
                {this.renderPopular()}
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {popular: state.discover.popular}
}

export default connect(mapStateToProps)(Popular);