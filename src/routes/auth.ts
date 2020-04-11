import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

export const userIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: (state) => state.getIn(["user", "login"]),
  authenticatingSelector: (state) => state.getIn(["user", "loading"]),
  redirectPath: "/login"
});
