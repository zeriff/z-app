import React from 'react';
import {connect} from 'react-redux';

import ProfileTile from '../components/profiletile';
import BoardGrid from '../components/boardgrid';
import * as actions from '../actions/profile';
import {Container} from 'semantic-ui-react';

class Profile extends React.Component {
    componentDidMount() {
        this.props.fetchUserBoards();
    }

    styles = {
        profilecontainer: {
            paddingBottom: '5px',
            paddingLeft: '8px',
            paddingRight: '8px'
        }
    }

    render() {
        return (
            <div>
                <Container style={this.styles.profilecontainer}>
                    <ProfileTile {...this.props}/>
                </Container>
                <Container>
                    <BoardGrid boards={this.props.profile.userboards}></BoardGrid>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {profile: state.profile}
}

export default connect(mapStateToProps, actions)(Profile);
