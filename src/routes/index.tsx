import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import NotFoundPage from "~/pages/error/NotFound";
import {
  Boarding,
  BoardingFarmer,
  ForgotPassword,
  HelperRegister,
  Home,
  Login,
  ProviderRegister
} from "~/pages/public";
import NavigationWrapper from "~/routes/NavigationWrapper";

export default function AppRoutes() {
  return (
    <Switch>
      {/*Public Routes*/}
      <Route exact path="/" component={Home} />

      <Route exact path="/signin" component={Login} />
      <Route exact path="/register/provider" component={ProviderRegister} />
      <Route exact path="/register/helper" component={HelperRegister} />

      <Route exact path="/boarding" component={Boarding} />
      <Route exact path="/boarding-farmer" component={BoardingFarmer} />
      <Route exact path="/forgot-password" component={ForgotPassword} />

      {/*
       <Route path="/profile" component={userIsAuthenticated(Profile)}/>
       */}

      <NavigationWrapper />

      <Route exact path="/404" component={NotFoundPage} />

      {/*Redirect*/}
      <Redirect push to="/404" />
    </Switch>
  );
}
