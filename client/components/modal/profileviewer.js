import React from 'react';
import Modal from 'react-modal';
import {Image, Grid, Icon} from 'semantic-ui-react';
import {ModalStyles} from './Style';

export default class ProfileViewer extends React.Component {

    buildCloseButton() {
        return (
            <div
                onClick={this.props.closeModal}
                style={{
                position: 'fixed',
                right: '20px',
                top: '20px',
                fontSize: '3em',
                cursor: "pointer",
                fontWeight: 200,
                color: 'white'
            }}><Icon name="cancel" inverted/></div>
        )
    }

    renderContent() {
        return (
            <Grid centered>
                <Grid.Column width={8}>
                    <Image src={this.props.src}></Image>
                </Grid.Column>
            </Grid>
        );
    }
    render() {
        return (
            <Modal
                isOpen={this.props.open}
                onRequestClose={this.props.closeModal}
                style={ModalStyles}
                contentLabel="Modal">
                {this.buildCloseButton()}
                {this.renderContent()}
            </Modal>
        );
    }
}
