const USER_TOKEN_KEY = "jwt";
const HIDE_BANNER_KEY = "demo_banner";

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

  setToken: function (token) {
    this.setObject(USER_TOKEN_KEY, token);
  },

  getToken: function () {
    return this.get(USER_TOKEN_KEY);
  },

  setHideBanner: function (hideBanner) {
    this.setObject(HIDE_BANNER_KEY, hideBanner);
  },

  getHideBanner: function () {
    return this.get(HIDE_BANNER_KEY);
  },

  clearStorage: function () {
    _rememberLogin ? localStorage.clear() : sessionStorage.clear();
  }
};
