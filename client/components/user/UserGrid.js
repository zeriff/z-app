import React from 'react';
import {Grid, Image, Header, Container} from 'semantic-ui-react';
import Follow from '../button/follow';

class UserGrid extends React.Component {

    renderColumns() {
        let a = [];
        for (let i = 0; i < 20; i++) {
            a.push(i);
        }

        return a.map(function (user) {
            return (
                <Grid.Column key={Math.random()}>
                    <Image src="/img/logo.png" shape="circular"></Image>
                    <Header>
                        Sujan Thakare
                        <Header.Subheader>
                            Traveller & developer
                        </Header.Subheader>
                    </Header>
                    <Follow follow={false} current_user_id={123} userId={123}></Follow>
                </Grid.Column>
            );
        });
    }

    render() {
        return (
            <Container>
                <Grid columns={5} centered stackable>
                    {this.renderColumns()}
                </Grid>
            </Container>
        );
    }
}

export default UserGrid;