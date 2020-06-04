import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PersonIcon from "@material-ui/icons/Person";
import RoomIcon from "@material-ui/icons/Room";
import ScheduleIcon from "@material-ui/icons/Schedule";
import React from "react";
import { Route, RouteProps, Switch } from "react-router-dom";
import { NavigationBar } from "~/components/NavigationBar";
import { Dashboard, HelpConfirmation, Profile } from "~/pages/private";
import {
  Credits,
  CreditsPhotoMaterial,
  FaqFarmer,
  FaqHelper,
  FaqOverview,
  Login,
  Map,
  ProviderDetails
} from "~/pages/public";
import { useTypedSelector } from "~/reducers";
import {
  helperIsAuthenticated,
  providerIsAuthenticated,
  userIsAuthenticated
} from "~/routes/auth";

const providerTabs = [
  {
    route: "/dashboard",
    icon: <ScheduleIcon />,
    value: "/dashboard",
    label: "Helfer"
  },
  {
    route: "/profile",
    icon: <PersonIcon />,
    value: "/profile",
    label: "Meine Daten"
  },
  {
    route: "/faq",
    icon: <MoreHorizIcon />,
    value: "/faq",
    label: "Mehr"
  }
];

const NavigationWrapper = ({ location }: RouteProps) => {
  const user = useTypedSelector((state) => state.get("user"));
  const isProvider = user.get("type") === "provider";
  let tabs;
  if (isProvider) {
    tabs = providerTabs;
  } else {
    tabs = [
      {
        route: "/map",
        icon: <RoomIcon />,
        value: "/map",
        label: "In der Nähe"
      }
    ];
    if (user.get("login")) {
      tabs = tabs.concat([
        {
          route: "/dashboard",
          icon: <ScheduleIcon />,
          value: "/dashboard",
          label: "Jobs"
        },
        {
          route: "/profile",
          icon: <PersonIcon />,
          value: "/profile",
          label: "Profil"
        },
        {
          route: "/faq",
          icon: <MoreHorizIcon />,
          value: "/faq",
          label: "Mehr"
        }
      ]);
    } else {
      tabs = tabs.concat([
        {
          route: "/login",
          icon: <PersonIcon />,
          value: "/login",
          label: "Login"
        },
        {
          route: "/faq",
          icon: <MoreHorizIcon />,
          value: "/faq",
          label: "Mehr"
        }
      ]);
    }
  }

  const renderHelperRoutes = () => {
    return (
      <Switch>
        <Route path="/map" component={Map} />
        <Route path="/dashboard" component={userIsAuthenticated(Dashboard)} />
        <Route path="/profile" component={userIsAuthenticated(Profile)} />
        <Route path="/providers/:id" exact component={ProviderDetails} />
        <Route
          path="/providers/:id/confirmHelp"
          component={helperIsAuthenticated(HelpConfirmation)}
        />
        <Route path="/login" component={Login} />
        <Route exact path="/faq" component={FaqOverview} />
        <Route exact path="/faq/farmer" component={FaqFarmer} />
        <Route exact path="/faq/helper" component={FaqHelper} />

        <Route exact path="/credits" component={Credits} />
        <Route
          exact
          path="/credits/photo-material"
          component={CreditsPhotoMaterial}
        />
      </Switch>
    );
  };

  const renderProviderRoutes = () => {
    return (
      <Switch>
        <Route
          path={"/dashboard"}
          exact
          component={providerIsAuthenticated(Dashboard)}
        />
        <Route path={"/profile"} component={providerIsAuthenticated(Profile)} />
        <Route exact path="/faq" component={FaqOverview} />
        <Route exact path="/faq/farmer" component={FaqFarmer} />
        <Route exact path="/faq/helper" component={FaqHelper} />

        <Route exact path="/credits" component={Credits} />
        <Route
          exact
          path="/credits/photo-material"
          component={CreditsPhotoMaterial}
        />
      </Switch>
    );
  };

  return (
    <>
      <NavigationBar pathname={location.pathname} tabs={tabs} />
      {isProvider ? renderProviderRoutes() : renderHelperRoutes()}
    </>
  );
};

export default NavigationWrapper;
