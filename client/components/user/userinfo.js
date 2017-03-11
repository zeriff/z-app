import React from 'react';
import {Header, Button, Icon, Input} from 'semantic-ui-react'

export default class UserInfo extends React.Component {
    whiteBgText = {
        backgroundColor: 'white',
        fontWeight: '200'
    }

    state = {
        nameEditMode: false
    }

    setEditMode() {
        this.setState({nameEditMode: true})
    }
    doneEdit() {
        this.setState({nameEditMode: false})
    }

    render() {
        let nameEditInput = (
            <span style={this.whiteBgText}>
                {this.props.name}&nbsp;&nbsp; ...<Icon name="pencil" onClick={this.setEditMode.bind(this)}></Icon>
            </span>
        )
        if (this.state.nameEditMode) {
            nameEditInput = (
                <span>
                    <input defaultValue={this.props.name}/>
                    <Button size={'small'} inverted basic onClick={this.doneEdit.bind(this)}>Done</Button>
                </span>
            )
        }

        return (
            <div>
                <Header as='h1'>
                    {nameEditInput}
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button basic inverted circular size="small">Follow</Button>
                </Header>
                <Header as='h2'>
                    <span style={this.whiteBgText}>
                        <i>
                            {this.props.profession}
                        </i>

                    </span>
                </Header>
                <Header as='h3'>
                    <span style={this.whiteBgText}>
                        <i>
                            {this.props.bio}
                        </i>
                    </span>
                </Header>
            </div>
        )
    }
}
