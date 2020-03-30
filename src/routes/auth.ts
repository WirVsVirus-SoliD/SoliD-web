import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const userIsAuthenticatedDefaults = {
  authenticatedSelector: (state) => state.getIn(["user", "login"]),
  authenticatingSelector: (state) => state.getIn(["user", "loading"])
};

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  redirectPath: "/login"
});
