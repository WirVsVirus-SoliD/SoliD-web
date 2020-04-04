import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import NotFoundPage from "~/pages/error/NotFound";
import BoardingFarmer from "~/pages/public/BoardingFarmer";
import ForgotPassword from "~/pages/public/ForgotPassword";
import Home from "~/pages/public/Home";
import Login from "~/pages/public/Login";
import Map from "~/pages/public/Map";
import SplashScreen from "~/pages/public/SplashScreen";

export default function AppRoutes() {
  return (
    <Switch>
      {/*Public Routes*/}
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />

      <Route exact path="/map" component={Map} />
      <Route exact path="/boarding-farmer" component={BoardingFarmer} />
      <Route exact path="/forgot-password" component={ForgotPassword} />

      <Route exact path="/404" component={NotFoundPage} />

      {/* Screens - only for presentational purposes */}
      <Route exact path="/screens/splash" component={SplashScreen} />

      {/*Redirect*/}
      <Redirect
        push
        to={{
          pathname: "/404"
        }}
      />
    </Switch>
  );
}
