import React from 'react';
import * as actions from './../../actions';
import {connect} from 'react-redux';

class Blog extends React.Component {
    constructor(ar) {
        super(ar)
        this.state = {
            tagText: ""
        };
    }

    handleOnFormSubmit(e) {
        e.preventDefault();
        this.props.addTag(this.state.tagText);
        this.setState({tagText: ""})
    }

    render() {
        return (
            <div className="blog">
                <form onSubmit={this.handleOnFormSubmit.bind(this)}>
                    <input value={this.state.tagText} type="text" placeholder="Enter blog tag" onChange={e => this.setState({tagText: e.target.value})}/>
                    <button type="submit">Add Tag</button>
                </form>
            </div>
        )
    }
}

export default connect(null, actions)(Blog);
