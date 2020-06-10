import { BurgerBuider } from "./BurgerBuider";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import React from "react";
configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuider onInitIngredient={() => {}} />);
  });

  it("should render <BuildControls /> when receiving ingredients", () => {
    wrapper.setProps({ ing: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
