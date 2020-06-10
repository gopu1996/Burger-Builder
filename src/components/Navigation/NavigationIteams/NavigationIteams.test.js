import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationIteams from "./NavigationIteams";
import NavigationIteam from "./NavigationIteam/NavigationIteam";

configure({ adapter: new Adapter() });
let wrapper;
describe("<NavigationIteams />", () => {
  it("should render one <NavigationItem /> elements if not authenticated", () => {
    wrapper = shallow(<NavigationIteams />);
    expect(wrapper.find(NavigationIteam)).toHaveLength(1);
  });
  it("should render three <NavigationItem /> elements if authenticated", () => {
    // wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationIteam)).toHaveLength(3);
  });

  it("should render one <NavigationItem /> element with Logout label if authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationIteam link="/logout">Logout</NavigationIteam>)
    ).toEqual(true);
  });
});
