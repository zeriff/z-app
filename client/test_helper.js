import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai, {expect} from 'chai';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './reducers';
import React from 'react';
import chaiJquery from 'chai-jquery';

//Testing environment, creating a fake browser environment and hooking into jquery
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;

global.navigator = {
    userAgent: 'node.js'
};
const $ = jquery(global.window);

//Creating a renderComponent function for rendering into fake browser
function renderComponent(ComponentClass, props, state) {
    const renderedComponentInstance = TestUtils.renderIntoDocument(
        <Provider store={createStore(reducers, state)}>
            <ComponentClass {...props}/>
        </Provider>
    );
    return $(ReactDOM.findDOMNode(renderedComponentInstance));
}
$.fn.simulate = function(eventName, value) {
    if (value) {
        this.val(value);
    }
    TestUtils.Simulate[eventName](this[0]);
}

chaiJquery(chai, chai.util, $);
export {renderComponent, expect};
