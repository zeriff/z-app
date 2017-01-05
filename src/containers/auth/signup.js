import React from 'react';

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
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
                            <div className="field">
                                <input type="text" name="Confirmpassoword" placeholder="Confirm password" value={this.state.username} onChange={this.onUsernameChange.bind(this)}></input>
                            </div>
                            <button type="submit" className="ui primary submit button">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;

//
// #session
//   %div.ui.two.column.center.aligned.stackable.grid
//     %div.six.wide.column
//       -# = image_tag "/logo.png", class: "ui centered tiny image"
//       %h2
//         Sign up
//       %div.ui.segment
//         = simple_form_for(resource, as: resource_name, url: registration_path(resource_name)) do |f|
//           = f.input :username, required: false, autofocus: true, label: false, placeholder: "Username"
//           = f.input :email, required: true, label: false, placeholder: "Email"
//           -# = f.input :gender
//           .field
//             .ui.selection.fluid.dropdown
//               %input{type: "hidden" ,name: "user[gender]", id: "user_gender"}
//               %i.dropdown.icon
//               .default.text Gender
//               .menu
//                 .item{"data-value" => "0"} Male
//                 .item{"data-value" => "1"} Female
//           -# %input{type: "number",name:"user[gender]" id:"user_gender"}
//           -# = f.input :gender, collection:[["Gender", 0], ["Male", 1], ["Female", 2]], label: false,:default => 1
//           .field
//             .ui.fluid.location.search
//               .ui.icon.input
//                 %input.prompt{placeholder: "Location (Paris, France)", type: "text", name: "user[location]", id: "user_location", data: {noblock: true}}
//                 %i.search.link.icon
//               .results
//           -# = f.input :location,label: false, placeholder: "Location (Paris, France)"
//           = f.input :password, label: false, placeholder: "password", required: true
//           = f.input :password_confirmation, required: true, label: false, placeholder: "Re-enter password"
//           = f.button :submit, "Sign up"
//       = render "devise/shared/links"
