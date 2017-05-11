import React from 'react';
import Modal from 'react-modal';
import {Container, Segment, Header} from 'semantic-ui-react';
import Tabs, {TabPane} from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import {connect} from 'react-redux';
import UserGrid from '../components/user/UserGrid';

class FollowStates extends React.Component {

    styles = {
        segment: {
            color: 'black',
            backgroundColor: '#f5f5f5',
            border: "0px"
        },
        container: {
            paddingTop: "36px"
        },
        header: {
            backgroundImage: 'url(' + this.props.profile.avatar.thumb + ')',
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat',
            backgroundSize: "cover",
            borderRadius: '0px',
            fontFamily: '"Raleway", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif'
        }
    }

    render() {
        let {profile} = this.props;
        return (
            <Container style={this.styles.container}>
                <Header style={this.styles.header} as="h1" attached='top'>
                    {profile.username}
                </Header>
                <Segment attached style={this.styles.segment}>
                    <Tabs
                        className="customtabs"
                        defaultActiveKey="1"
                        renderTabBar={() => (<ScrollableInkTabBar/>)}
                        renderTabContent={() => (<TabContent/>)}>
                        <TabPane tab='Followers' key="1">
                            <UserGrid users={[{}]}></UserGrid>
                        </TabPane>
                        <TabPane tab='Following' key="2">
                            <UserGrid users={[{}]}></UserGrid>
                        </TabPane>
                    </Tabs>
                </Segment>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {profile: state.profile}
}

export default connect(mapStateToProps)(FollowStates);
