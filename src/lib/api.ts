const domain = process.env.REACT_APP_API_PATH;

export default {
  auth: {
    refresh: domain + "/auth/refresh",
    login: domain + "/auth/login"
  },
  providers: {
    collection: domain + "/providers"
  },
  helpers: {
    collection: domain + "/helpers"
  }
};
