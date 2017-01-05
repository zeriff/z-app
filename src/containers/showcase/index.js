import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Showcase extends React.Component {
    render() {
        return (
            <div className="showcase">
                <h1>Showcase</h1>
                <Link to="/blog">Blog</Link>
            </div>
        )
    }
}

export default connect()(Showcase);
