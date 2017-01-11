import React from 'react';
import UserList from './../../components/user/userlist';
import {connect} from 'react-redux';

class Users extends React.Component {

    render() {
        return (
            <div className="ui container">
                <br></br>
                <div className="ui segment">
                    <UserList users={this.props.users}></UserList>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {users: state.users}
}
export default connect(mapStateToProps)(Users);
