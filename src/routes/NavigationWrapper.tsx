import React from "react";
import { Clock, MapPin, User } from "react-feather";
import { Route, Switch } from "react-router-dom";
import { NavigationBar } from "~/components/NavigationBar";
import { Helpers, Jobs, Profile } from "~/pages/private";
import { Login, Map } from "~/pages/public";

const helperTabs = [
  { route: "/map", icon: <MapPin />, value: "nearby", label: "In der Nähe" },
  { route: "/jobs", icon: <Clock />, value: "jobs", label: "Jobs" },
  { route: "/profile", icon: <User />, value: "profile", label: "Profil" },
  { route: "/login", icon: <User />, value: "login", label: "Login" }
];

const providerTabs = [
  {
    route: "/helpers",
    icon: <Clock />,
    value: "helpers",
    label: "Meine Helfer"
  },
  { route: "/profile", icon: <User />, value: "profile", label: "Meine Daten" }
];

const NavigationWrapper = () => {
  const helper = true;
  // FIXME Use user data from store

  const renderHelperRoutes = () => {
    return (
      <Switch>
        <Route path={"/map"} component={Map} />
        <Route path={"/jobs"} component={Jobs} />
        <Route path={"/profile"} component={Profile} />
        <Route path={"/login"} component={Login} />
      </Switch>
    );
  };

  const renderProviderRoutes = () => {
    return (
      <Switch>
        <Route path={"/helpers"} exact component={Helpers} />
        <Route path={"/profile"} component={Profile} />
      </Switch>
    );
  };

  return (
    <>
      {helper ? renderHelperRoutes() : renderProviderRoutes()}
      <NavigationBar tabs={helper ? helperTabs : providerTabs} />
    </>
  );
};

export default NavigationWrapper;
