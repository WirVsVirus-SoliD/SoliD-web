const USER_ACCESS_TOKEN_KEY = "access";
const USER_REFRESH_TOKEN_KEY = "refresh";

let privateModeWarning = false;

let _rememberLogin = false;

export default {
  setRememberLogin(rememberLogin) {
    _rememberLogin = rememberLogin;
  },

  get: function (key) {
    const item = _rememberLogin
      ? localStorage.getItem(key)
      : sessionStorage.getItem(key);
    return JSON.parse(item);
  },

  setObject: function (key, object) {
    try {
      const json = JSON.stringify(object);
      _rememberLogin
        ? localStorage.setItem(key, json)
        : sessionStorage.setItem(key, json);
    } catch (e) {
      if (!privateModeWarning) {
        privateModeWarning = true;
        alert(
          'Der Browser befindet sich im "PRIVATE MODE". Userdaten können nicht gepeichert werden.'
        );
      }
    }
  },

  setAccessToken: function (token) {
    this.setObject(USER_ACCESS_TOKEN_KEY, token);
  },

  getAccessToken: function () {
    return this.get(USER_ACCESS_TOKEN_KEY);
  },

  setRefreshToken: function (token) {
    this.setObject(USER_REFRESH_TOKEN_KEY, token);
  },

  getRefreshToken: function () {
    return this.get(USER_REFRESH_TOKEN_KEY);
  },

  clearStorage: function () {
    _rememberLogin ? localStorage.clear() : sessionStorage.clear();
  }
};
