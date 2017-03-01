import React from 'react';

export default class Application extends React.Component {

    render() {
        return (
            <div className="ui container">
                <div className="ui borderless top fixed small menu">
                    <a href="/" className="item">
                        <img className="ui mini circular image" src="/img/logo.png"></img>
                    </a>
                    <div className="right menu">
                        <div className="item">
                            <a href="/auth" className="ui mini basic black button">Signin</a>
                        </div>
                        <div className="item">
                            <a href="/auth/signup" className="ui mini basic black button">Signup</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
