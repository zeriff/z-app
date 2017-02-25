import React from 'react';
import Image from './image'
import OwlCarousel from 'react-owl-carousel';
import {Divider} from 'semantic-ui-react';
import {Parallax, Background} from 'react-parallax';
import _ from 'lodash'

export default class SliderBoard extends React.Component {
    _renderImages() {
        return this.props.boards.map(function(board) {
            return (
                <Image key={Math.random()} image={board}></Image>
            )
        });
    }

    render() {
        return (
            <div className="custom">
                <Parallax bgImage={_.sample(this.props.boards).image_url} strength={150}>
                    <div className="customdiv">
                        <div className="boardtitle">
                            {this.props.title}
                        </div>
                        <div className="ui right floated yellow circular icon basic button">
                            <i className="plus icon"></i>
                        </div>
                    </div>
                </Parallax>
            </div>
        )
    }

    // render() {
    //     return (
    //         <div className="board">
    //             <div className="ui piled segment">
    //                 <div className="ui top attached label">
    //                     <div className="pintitle">
    //                         {this.props.title}
    //                     </div>
    //                 </div>
    //                 <OwlCarousel slideSpeed={500} singleItem autoPlay>
    //                     {this._renderImages()}
    //                 </OwlCarousel>
    //             </div>
    //         </div>
    //     )
    // }

    // render() {
    //     return (
    //         <div className="board">
    //             <div className="ui piled segment">
    //                 <div className="ui top attached label">
    //                     <div className="pintitle">
    //                         {this.props.title}
    //                     </div>
    //                 </div>
    //                 <Parallax bgImage={_.sample(this.props.boards).image_url} strength={150} style={{
    //                     minHeight: '600px'
    //                 }}></Parallax>
    //             </div>
    //         </div>
    //     )
    // }
}
