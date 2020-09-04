import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, {shallow} from "enzyme";
import InfoCard from "./InfoCard";
Enzyme.configure({adapter: new Adapter()});
const data = {
    label: 'test',
    value: 'data'
};
describe('InfoCard', () => {
    it('should render accept, ', () => {
        const infoCard = shallow(<InfoCard label={data.label} value={data.value}/>);
        expect(infoCard.find('h4').text()).toEqual(data.label);
        expect(infoCard.find('p').text()).toEqual(data.value);

    });
});