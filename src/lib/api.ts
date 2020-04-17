const domain = process.env.REACT_APP_API_PATH;

export default {
  auth: {
    refresh: domain + "/auth/refresh",
    login: domain + "/auth/login",
    validate: domain + "/auth/validate"
  },
  providers: {
    collection: domain + "/providers",
    inquired: domain + "/providers/inquired"
  },
  helpers: {
    collection: domain + "/helpers",
    inquired: domain + "/helpers/inquired",
    favorites: domain + "/helpers/favorites"
  }
};
