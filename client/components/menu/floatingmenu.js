import React from 'react';
import {Menu, MainButton, ChildButton} from 'react-mfb';

export default class FloatingMenu extends React.Component {

    render() {

        var effect = 'zoomin',
            pos = 'br',
            method = 'hover';

        return (
            <Menu effect={effect} method={method} position={pos}>
                <MainButton iconResting="ion-plus-round" iconActive="ion-close-round">
                    <img src="/img/logo.png"></img>
                </MainButton>
                <ChildButton icon="ion-social-github"/>
                <ChildButton icon="ion-social-octocat"/>
                <ChildButton icon="ion-social-twitter"/>
            </Menu>
        )
    }
}
