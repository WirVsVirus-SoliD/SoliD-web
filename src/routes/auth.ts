import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const userIsAuthenticatedDefaults = {
  authenticatedSelector: (state) => state.getIn(["user", "login"]),
  authenticatingSelector: (state) => state.getIn(["user", "loading"])
};

export const userIsAuthenticated = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  redirectPath: "/login"
});

export const helperIsAuthenticated = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  redirectPath: "/boarding"
});

export const providerIsAuthenticated = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  redirectPath: "/signin"
});
