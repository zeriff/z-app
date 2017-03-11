import React from 'react';
import NavBar from './menu/navbar';
import {Button, Icon, Container} from 'semantic-ui-react';

class Main extends React.Component {

    styles = {
        new_pin_button_style: {
            position: 'fixed',
            bottom: '20px',
            right: '20px'
        }
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

                        <label htmlFor="pin_image" className="ui icon right floated yellow icon big circular button">
                            <i className="plus icon"></i>
                        </label>

                        <input style={{
                            display: 'none'
                        }} id="pin_image" ref="in" type="file" accept="image/*"/>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Main;
//
// <Button htmlFor="pin_image" circular icon size={'big'} floated="right" color={'yellow'}>
//     <Icon name='plus'></Icon>
// </Button>
