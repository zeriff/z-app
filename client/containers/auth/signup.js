import React from 'react';

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            confirmpassword: ""
        }
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
                        <h2>Sign Up</h2>
                        <form className="ui form segment">
                            <div className="field">
                                <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.onUsernameChange.bind(this)}></input>
                            </div>
                            <div className="field">
                                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange.bind(this)}></input>
                            </div>
                            <button type="submit" className="ui primary submit button">Signup</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;
