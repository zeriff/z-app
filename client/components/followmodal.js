import React from 'react';
import Modal from 'react-modal';
import {Container} from 'semantic-ui-react';

class FollowModal extends React.Component {

    _renderContent() {
        return (
            <Container>
                <h1>Follow modal</h1>
            </Container>
        );
    }

    render() {
        return (
            <Modal isOpen={this.props.open} onRequestClose={this.props.closeModal} style={this.styles} contentLabel="Modal">
                <div onClick={this.props.closeModal} style={{
                    position: 'fixed',
                    right: '20px',
                    top: '20px',
                    fontSize: '3em',
                    cursor: "pointer",
                    fontWeight: 200
                }}>X</div>
                {this._renderContent()}
            </Modal>
        );
    }
    styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: '1000',
            transition: '1s ease'
        },
        content: {
            position: 'absolute',
            color: 'white',
            top: '10px',
            left: '10px',
            right: '10px',
            bottom: '10px',
            border: '0px',
            background: '',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '0px',
            outline: 'none',
            padding: '20px',
            transition: '1s ease'

        }
    }
}

export default FollowModal;
