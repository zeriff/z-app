import React from 'react';
import {connect} from 'react-redux';
import {Icon, Menu, Container, Button} from 'semantic-ui-react'

class PinView extends React.Component {

    render() {
        return (
            <div>
                <Menu className="pinview" fixed="top" size={"massive"} borderless={true}>
                    <Container>
                        <Menu.Menu>
                            <br></br>
                            <Menu.Item as={Button} content='' icon='left chevron' labelPosition='left'></Menu.Item>
                        </Menu.Menu>
                    </Container>
                </Menu>

                <div className="pinview-bg" style={{
                    backgroundImage: "url(https://zeriffuploads.s3.ap-south-1.amazonaws.com/58916d49f400649e292417fe%2Fpins%2F58bb0812661fb98b942f3b2e)"
                }}>
                    <div className="bg-text"></div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {pin: {}}
}

export default connect(mapStateToProps)(PinView);
//
// <img className="ui fluid image" src="https://zeriffuploads.s3.ap-south-1.amazonaws.com/58916d49f400649e292417fe%2Fpins%2F58bb0812661fb98b942f3b2e"></img>
