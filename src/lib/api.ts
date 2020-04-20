const domain = process.env.REACT_APP_API_PATH;

export default {
  auth: {
    refresh: domain + "/auth/refresh",
    login: domain + "/auth/login",
    validate: domain + "/auth/validate"
  },
  providers: {
    collection: domain + "/providers"
  },
  helpers: {
    collection: domain + "/helpers"
  },
  inquiries: {
    collection: domain + "/inquiries"
  },
  favorites: {
    collection: domain + "/favorites"
  },
  media: {
    downloadPicture: (id) => domain + `/media/${id}/download-picture`
  }
};
