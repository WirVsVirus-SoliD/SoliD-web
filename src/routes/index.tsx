import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NotFoundPage from "../pages/error/NotFound";
import BoardingFarmer from "../pages/public/BoardingFarmer";
import Home from "./../pages/public/Home";
import Map from "./../pages/public/Map";

export default function AppRoutes() {
  return (
    <Switch>
      {/*Public Routes*/}
      <Route exact path="/" component={Home} />

      <Route exact path="/map" component={Map} />
      <Route exact path="/boarding-farmer" component={BoardingFarmer} />

      <Route exact path="/404" component={NotFoundPage} />

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
