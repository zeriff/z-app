import {renderComponent, expect} from './../../test_helper';
import Showcase from './index';

describe('Home', () => {
    let component;
    beforeEach(() => {
        component = renderComponent(Showcase);
    });

    it('has div with class home', () => {
        expect(component).to.have.class ('showcase');
    });
});
