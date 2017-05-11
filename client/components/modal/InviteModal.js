import React from 'react';
import Modal from 'react-modal';
import {ModalStyles} from './Style';
import {
    Icon,
    Grid,
    Image,
    Button,
    Segment,
    Input,
    Form,
    Header,
    Label
} from 'semantic-ui-react';

import {connect} from 'react-redux';
import * as actions from '../../actions/userboard';

class InviteModal extends React.Component {

    constructor(props) {
        super(props);
        this.onInviteFormSubmit = this
            .onInviteFormSubmit
            .bind(this);

        this.saveInvites = this
            .saveInvites
            .bind(this);
    }

    state = {
        invites: [],

        users: []
    }
    styles = {
        listItem: {
            textAlign: 'left'
        },
        segment: {
            paddingTop: '36px',
            paddingBottom: '20px',
            marginTop: '27%'
        }
    }

    saveInvites() {
        let me = this;
        console.log(this.state.invites);
        this
            .props
            .invite(this.props.board._id, this.state.invites, function () {
                me
                    .props
                    .closeModal();  
            });
    }

    _renderLabels() {
        let me = this;
        return me
            .state
            .invites
            .map(function (invite) {

                return (
                    <Label
                        key={invite}
                        as='a'
                        style={{
                        marginBottom: "3px"
                    }}>
                        <Icon
                            onClick={e => {
                            let arr = me.state.invites;
                            arr.splice(arr.findIndex((i) => i === invite), 1);
                            me.setState({invites: arr});
                        }}
                            name='cancel'/> {invite}
                    </Label>
                )
            });
    }

    _renderBoard() {
        let {board} = this.props;
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Image
                            size="medium"
                            src={board.image
                            ? board.image.thumb
                            : board.image_url}/>

                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Header
                            as="h5"
                            style={{
                            ...this.styles.listItem,
                            fontSize: '1.2em'
                        }}>
                            {board.title}
                        </Header>
                        <div style={this.styles.listItem}>
                            <Label
                                as='a'
                                style={{
                                marginBottom: "2px"
                            }}>
                                <Icon name='tags'/> {this.state.invites.length}
                            </Label>
                            {this._renderLabels()}
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={6}></Grid.Column>
                    <Grid.Column width={10}>
                        <Form onSubmit={this.onInviteFormSubmit}>
                            <div className="ui action input fluid">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="To invite, type an email"
                                    ref="email_input"/>
                                <Button type="submit">Add</Button>
                            </div>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    _renderUserList() {
        return this
            .state
            .users
            .map(function (user) {});
    }

    onInviteFormSubmit(e, {formData}) {
        e.preventDefault();
        let email = formData.email;
        let set = new Set(this.state.invites);
        if (!set.has(email)) {
            this.setState({
                invites: [
                    ...this.state.invites,
                    email
                ]
            });
        } else {
            toastr.info('Already Added');
        }
        this.refs.email_input.value = "";
    }
    _renderContent() {
        return (
            <Grid centered>
                <Grid.Column width={8}>
                    <Segment style={this.styles.segment}>
                        {this._renderBoard()}
                    </Segment>
                    <Button basic color="yellow" floated="right" onClick={this.saveInvites}>Save</Button>
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
                <div
                    onClick={this.props.closeModal}
                    style={{
                    position: 'fixed',
                    right: '20px',
                    top: '20px',
                    fontSize: '3em',
                    cursor: "pointer",
                    fontWeight: 200
                }}>
                    <Icon name="cancel" inverted></Icon>
                </div>  
                {this._renderContent()}
            </Modal>
        );
    }
}

export default connect(null, actions)(InviteModal);
