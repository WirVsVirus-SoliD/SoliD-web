import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import NotFoundPage from "~/pages/error/NotFound";
import {
  Boarding,
  BoardingFarmer,
  Credits,
  CreditsPhotoMaterial,
  FaqFarmer,
  FaqHelper,
  FaqOverview,
  ForgotPassword,
  HelperRegister,
  Home,
  Login,
  ProviderRegister
} from "~/pages/public";
import ResetPassword from "~/pages/public/ResetPassword";
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
      <Route exact path="/reset-password" component={ResetPassword} />

      <Route exact path="/faq" component={FaqOverview} />
      <Route exact path="/faq/farmer" component={FaqFarmer} />
      <Route exact path="/faq/helper" component={FaqHelper} />

      <Route exact path="/credits" component={Credits} />
      <Route
        exact
        path="/credits/photo-material"
        component={CreditsPhotoMaterial}
      />

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
