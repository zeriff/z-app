import React from 'react';
import UserList from './../../components/user/userlist';

export default class Users extends React.Component {

    render() {
        return (
            <div className="ui container">
                <br></br>
                <div className="ui segment">
                    <UserList></UserList>
                </div>
            </div>
        )
    }
}
