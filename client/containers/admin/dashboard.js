import React from 'react'

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="ui container">
                <div className="ui segment">
                    <div className="ui statistics">
                        <a href="/admin/users" className="red statistic">
                            <div className="value">
                                11
                            </div>
                            <div className="label">
                                Users
                            </div>
                        </a>
                        <div className="orange statistic">
                            <div className="value">
                                8
                            </div>
                            <div className="label">
                                Boards
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
