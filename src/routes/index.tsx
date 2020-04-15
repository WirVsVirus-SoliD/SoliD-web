import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { validate } from "~/actions/user";
import storage from "~/lib/storage";

import NotFoundPage from "~/pages/error/NotFound";
import {
  Boarding,
  BoardingFarmer,
  ForgotPassword,
  HelperRegister,
  Home,
  Login,
  ProviderRegister,
  SplashScreen
} from "~/pages/public";
import NavigationWrapper from "~/routes/NavigationWrapper";

export default function AppRoutes() {
  // TODO validate token on first start here?
  const history = useHistory();
  const dispatch = useDispatch();
  const token = storage.getAccessToken();
  useEffect(() => {
    if (token) {
      dispatch(validate())
        // @ts-ignore
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          // TODO TRY REFRESH TOKEN IN MIDDLEWARE?
          storage.clearStorage();
          history.push("/login");
        });
    }
  }, [token, history, dispatch]);

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

      {/* Screens - only for presentational purposes */}
      <Route exact path="/screens/splash" component={SplashScreen} />
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
