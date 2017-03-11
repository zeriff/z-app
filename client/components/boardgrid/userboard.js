import React from 'react';
import {Parallax, Background} from 'react-parallax';

export default class UserBoard extends React.Component {
    render() {
        return (
            <a href={"/view/b?id=" + this.props.board._id} className="custom">
                <Parallax bgImage={this.props.board.image_url} strength={70}>
                    <div className={"customdiv" + this.props.divno}>
                        <div className="boardtitle">
                            {this.props.board.title}
                        </div>
                    </div>
                </Parallax>
            </a>
        )
    }
}
