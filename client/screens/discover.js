import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/discover';
import BoardGrid from '../components/boardgrid';
import {Container} from 'semantic-ui-react';
import _ from 'lodash';

class Discover extends React.Component {
    constructor(props) {
        super(props)
        this.props.loadDiscoverBoards();
    }
    componentDidMount() {}

    render() {
        return (
            <Container>
                <BoardGrid boards={_.map(this.props.boards, "board")}></BoardGrid>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {boards: state.discover.userboards}
}
export default connect(mapStateToProps, actions)(Discover);
