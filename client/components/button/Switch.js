import React from 'react';
import {Button, Popup} from 'semantic-ui-react';
import {userboard_editSettings} from '../../api/userboard';
import * as actions from '../../actions/profile';
import {connect} from 'react-redux';

class Switch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            private: this.props.private
        }
        this.toggle = this
            .toggle
            .bind(this);
    }

    toggle() {
        let me = this;
        me.setState({
            private: !this.state.private
        });
        let visibility = this.state.private
            ? 1
            : 0;
        userboard_editSettings(visibility, this.props.boardId).then(function (res) {
            if (res.success) {
                me.setState({private: me.state.private});
            }
        });
    }

    render() {
        if (this.state.private) {
            return (<Popup
                trigger={(
                <Button size="small" onClick={this.toggle} color="black" icon="lock"></Button>
            )}
                on='hover'
                basic
                size="small"
                inverted
                content='Make it public'
                hideOnScroll/>)
        }
        return (<Popup
            trigger={(
            <Button
                size="small"
                onClick={this.toggle}
                color="black"
                icon="unlock alternate"></Button>
        )}
            inverted
            on='hover'
            size="small"            
            content='Make it private'
            hideOnScroll/>)

    }
}

export default connect(null, actions)(Switch);