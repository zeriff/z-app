import React from 'react';
import Image from './image'
import OwlCarousel from 'react-owl-carousel';
import {Divider} from 'semantic-ui-react';
import {Parallax, Background} from 'react-parallax';
import _ from 'lodash'

export default class SliderBoard extends React.Component {
    _renderImages() {
        return this.props.board.pins.map(function(board) {
            return (
                <Image key={Math.random()} image={board}></Image>
            )
        });
    }

    viewBoard() {
        toastr.info("Getting board");
    }
    render() {
        console.log(this.props.board);
        return (
            <a href={"/view/b?id=" + this.props.board._id} className="custom">
                <Parallax bgImage={this.props.board.image_url} strength={70}>
                    <div className={"customdiv" + this.props.divno}>
                        <div className="boardtitle">
                            {this.props.title}
                        </div>
                    </div>
                </Parallax>
            </a>
        )
    }
}
