import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const classes = { selected: "text-brand" };

const NavigationBar = ({ tabs, pathname }) => {
  const [value, setValue] = useState(pathname);
  return (
    <BottomNavigation
      className="w-full fixed bottom-0"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      {tabs.map((tab) => (
        <BottomNavigationAction
          key={tab.value}
          classes={classes}
          value={tab.value}
          label={tab.label}
          icon={tab.icon}
          component={Link}
          to={tab.route}
        />
      ))}
    </BottomNavigation>
  );
};

export default NavigationBar;
