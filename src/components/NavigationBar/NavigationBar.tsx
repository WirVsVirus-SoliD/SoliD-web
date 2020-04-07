import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavigationBar = ({ tabs }) => {
  const [value, setValue] = useState();
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
