import React from 'react';
import {Popup, Button} from 'semantic-ui-react';
import InviteModal from '../modal/InviteModal';

class InviteButton extends React.Component {

    constructor(props) {
        super(props);
        this.toggleInviteModal = this
            .toggleInviteModal
            .bind(this);
    }

    state = {
        inviteModalOpen: false
    }
    toggleInviteModal() {
        this.setState({
            inviteModalOpen: !this.state.inviteModalOpen
        })
    }

    render() {
        return (
            <div>
                <Popup
                    trigger={(
                    <Button size="small" color="black" icon="tags" onClick={this.toggleInviteModal}></Button>
                )}
                    on='hover'
                    basic
                    size="small"
                    inverted
                    content='Invite your friends'
                    hideOnScroll/>
                <InviteModal
                    board={this.props.board}
                    open={this.state.inviteModalOpen}
                    closeModal={this.toggleInviteModal}></InviteModal>
            </div>
        );
    }
}

export default InviteButton;