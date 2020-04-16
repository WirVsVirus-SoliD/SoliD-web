import PersonIcon from "@material-ui/icons/Person";
import RoomIcon from "@material-ui/icons/Room";
import ScheduleIcon from "@material-ui/icons/Schedule";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { NavigationBar } from "~/components/NavigationBar";
import { Helpers, Jobs, Profile } from "~/pages/private";
import { Login, Map, ProviderDetails } from "~/pages/public";
import { useTypedSelector } from "~/reducers";
import { userIsAuthenticated } from "~/routes/auth";

const providerTabs = [
  {
    route: "/helpers",
    icon: <ScheduleIcon />,
    value: "helpers",
    label: "Meine Helfer"
  },
  {
    route: "/profile",
    icon: <PersonIcon />,
    value: "profile",
    label: "Meine Daten"
  }
];

const NavigationWrapper = () => {
  const user = useTypedSelector((state) => state.get("user"));
  const isHelper = true;
  let tabs;

  if (isHelper) {
    tabs = [
      {
        route: "/map",
        icon: <RoomIcon />,
        value: "nearby",
        label: "In der Nähe"
      },
      { route: "/jobs", icon: <ScheduleIcon />, value: "jobs", label: "Jobs" },
      user.get("login")
        ? {
            route: "/profile",
            icon: <PersonIcon />,
            value: "profile",
            label: "Profil"
          }
        : {
            route: "/login",
            icon: <PersonIcon />,
            value: "login",
            label: "Login"
          }
    ];
  } else {
    tabs = providerTabs;
  }

  const renderHelperRoutes = () => {
    return (
      <Switch>
        <Route path="/map" component={Map} />
        <Route path="/jobs" component={userIsAuthenticated(Jobs)} />
        <Route path="/profile" component={userIsAuthenticated(Profile)} />
        <Route path="/providers/:id" component={ProviderDetails} />
        <Route path="/login" component={Login} />
      </Switch>
    );
  };

  const renderProviderRoutes = () => {
    return (
      <Switch>
        <Route
          path={"/helpers"}
          exact
          component={userIsAuthenticated(Helpers)}
        />
        <Route path={"/profile"} component={userIsAuthenticated(Profile)} />
      </Switch>
    );
  };

  return (
    <>
      {isHelper ? renderHelperRoutes() : renderProviderRoutes()}
      <NavigationBar tabs={tabs} />
    </>
  );
};

export default NavigationWrapper;
