import React from "react";
import classes from "./NavigationIteams.css";
import NavigationIteam from "./NavigationIteam/NavigationIteam";

const NavigationIteams = (props) => (
  <ul className={classes.NavigationItems}>
    {props.isAuthenticated ? (
      <NavigationIteam link="/" exact>
        Buger Builder
      </NavigationIteam>
    ) : null}
    {props.isAuthenticated ? (
      <NavigationIteam link="/orders">Orders</NavigationIteam>
    ) : null}
    {!props.isAuthenticated ? (
      <NavigationIteam link="/auth">Authenticate</NavigationIteam>
    ) : (
      <NavigationIteam link="/logout">Logout</NavigationIteam>
    )}
  </ul>
);
export default NavigationIteams;
