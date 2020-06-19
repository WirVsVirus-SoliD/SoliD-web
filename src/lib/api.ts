const domain = process.env.REACT_APP_API_PATH;

export default {
  auth: {
    refresh: domain + "/auth/refresh",
    login: domain + "/auth/login",
    validate: domain + "/auth/validate",
    initReset: domain + "/auth/init-reset",
    reset: domain + "/auth/reset",
    activate: (token) => domain + `/auth/activate?token=${token}`
  },
  providers: {
    collection: domain + "/providers",
    show: (id) => domain + `/providers/${id}`
  },
  helpers: {
    collection: domain + "/helpers",
    show: (id) => domain + `/helpers/${id}`
  },
  inquiries: {
    collection: domain + "/inquiries",
    show: (id) => domain + `/inquiries/${id}`
  },
  favorites: {
    collection: domain + "/favorites",
    show: (id) => domain + `/favorites/${id}`
  },
  media: {
    downloadPicture: (id) => domain + `/media/${id}/download-picture`,
    upload: domain + "/media/upload-picture"
  }
};
