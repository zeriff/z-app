import {renderComponent, expect} from './../../test_helper';
import Blog from './index';

describe('Blog', () => {
    let component;
    beforeEach(() => {
        component = renderComponent(Blog);
    });

    it('has div with class home', () => {
        expect(component).to.have.class ('blog');
    });
});
