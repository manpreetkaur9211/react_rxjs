import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow} from 'enzyme';
import Dashboard from './Dashboard';
Enzyme.configure({adapter: new Adapter()});

describe('Dashboard', () => {

    let renderer;
    it('should render 3 Info Card for 3 systems, ', () => {
        renderer = new ShallowRenderer();
        const dashboard = shallow(<Dashboard />);
        expect(dashboard.find('InfoCard')).toHaveLength(3);
    });
});