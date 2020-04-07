import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import NotFoundPage from "~/pages/error/NotFound";
import { BoardingFarmer, ForgotPassword, Home, Login } from "~/pages/public";
import SplashScreen from "~/pages/public/SplashScreen";
import NavigationWrapper from "~/routes/NavigationWrapper";

export default function AppRoutes() {
  return (
    <Switch>
      {/*Public Routes*/}
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={Login} />

      <Route exact path="/boarding-farmer" component={BoardingFarmer} />
      <Route exact path="/forgot-password" component={ForgotPassword} />

      {/* Screens - only for presentational purposes */}
      <Route exact path="/screens/splash" component={SplashScreen} />
      {/*
       <Route path="/profile" component={userIsAuthenticated(Profile)}/>
       */}

      <NavigationWrapper />

      <Route exact path="/404" component={NotFoundPage} />

      {/*Redirect*/}
      <Redirect push to={{ pathname: "/404" }} />
    </Switch>
  );
}
