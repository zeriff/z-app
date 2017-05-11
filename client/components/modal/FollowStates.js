import React from 'react';
import Modal from 'react-modal';
import {Container, Segment, Header, Image, Icon} from 'semantic-ui-react';
import {ModalStyles} from './Style';

class FollowStates extends React.Component {

    styles = {
        blackText: {
            color: 'black'

        },
        header: {
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat',
            backgroundSize: "cover",
            borderRadius: '0px',
            fontFamily: '"Raleway", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif'
        }
    }

    _renderContent() {
        let {profile} = this.props;
        return (
            <Container>
                <Header style={this.styles.header} as="h1" attached='top'>
                    {profile.username}
                </Header>
                <Segment attached style={this.styles.blackText}>
                    
                </Segment>
            </Container>
        );
    }

    render() {
        return (
            <Modal
                isOpen={this.props.open}
                onRequestClose={this.props.closeModal}
                style={ModalStyles}
                contentLabel="Modal">
                <div
                    onClick={this.props.closeModal}
                    style={{
                    position: 'fixed',
                    right: '20px',
                    top: '20px',
                    fontSize: '3em',
                    cursor: "pointer",
                    fontWeight: 200
                }}><Icon name="cancel" inverted/></div>
                {this._renderContent()}
            </Modal>
        );
    }
}

export default FollowStates;
