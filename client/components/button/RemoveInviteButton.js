import React from 'react';
import {Popup, Button} from 'semantic-ui-react';
import * as actions from '../../actions/userboard';
import {connect} from 'react-redux';

class RemoveInviteButton extends React.Component {

    constructor(props) {
        super(props);
    }

    removeInvite() {
        this
            .props
            .deleteInvite(this.props.board._id);
    }

    render() {
        return (<Popup
            trigger={(
            <Button
                size="small"
                onClick={e => this.removeInvite()}
                color="black"
                icon="trash"></Button>
        )}
            on='hover'
            basic
            size="small"
            inverted
            content='Make it public'
            hideOnScroll/>)
    }
}

export default connect(null, actions)(RemoveInviteButton);