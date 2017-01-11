import React from 'react';
import axios from 'axios';
import storageMgr from '../../utils/storagemanager';
import {browserHistory} from 'react-router';
class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    onFormSubmit(e) {
        var me = this;
        e.preventDefault();
        axios.post("/api/auth", {
            username: me.state.username,
            password: me.state.password
        }).then(function(res) {
            if (res.data.success) {
                storageMgr.addUserDetails(res.data.userDetails);
                browserHistory.push("/");
                toastr.info(res.data.message);
            }

        });
    }

    onUsernameChange(e) {
        this.setState({username: e.target.value})
    }
    onPasswordChange(e) {
        this.setState({password: e.target.value})
    }

    render() {
        return (
            <div className="ui container">
                <div className="ui two column center aligned stackable grid">
                    <div className="six wide column">
                        <h2>Sign In</h2>
                        <form className="ui form segment" onSubmit={this.onFormSubmit.bind(this)}>
                            <div className="field">
                                <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.onUsernameChange.bind(this)}></input>
                            </div>
                            <div className="field">
                                <input type="password" name="username" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange.bind(this)}></input>
                            </div>
                            <button type="submit" className="ui primary submit button">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn;
