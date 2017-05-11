import React from 'react';
import NavBar from './menu/navbar';
import {Button, Icon, Container, Image} from 'semantic-ui-react';
import RiffUploader from './RiffUploader';

class Main extends React.Component {
    state = {
        pinupload_open: false
    }

    styles = {
        new_pin_button_style: {
            position: 'fixed',
            bottom: '20px',
            right: '20px'
        }
    }
    togglePinUpload() {
        this.setState({
            pinupload_open: !this.state.pinupload_open
        });
    }
    render() {
        return (
            <div>
                <NavBar/>
                <div style={{
                    paddingTop: "68px"
                }}>
                    {this.props.children}
                    <Container style={this.styles.new_pin_button_style}>
                        <Image
                            style={{
                            width: "54px",
                            textShadow: "2px 2px"
                            
                        }}
                            as="a"
                            className="ui right floated"
                            src="/img/add.png"
                            size="tiny"
                            onClick={this
                            .togglePinUpload
                            .bind(this)}></Image>
                    </Container>
                </div>
                <RiffUploader
                    open={this.state.pinupload_open}
                    closeModal={this
                    .togglePinUpload
                    .bind(this)}></RiffUploader>
            </div>
        );
    }
}

export default Main;
// <label htmlFor="pin_image" className="ui icon right floated yellow icon big
// circular button">     <i className="plus icon"></i> </label> <input style={{
//    display: 'none' }} id="pin_image" ref="in" type="file" accept="image/*"/>

//
// <Button htmlFor="pin_image" circular icon size={'big'} floated="right"
// color={'yellow'}>     <Icon name='plus'></Icon> </Button>