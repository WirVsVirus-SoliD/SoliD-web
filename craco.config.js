const path = require("path");
const reactHotReloadPlugin = require("craco-plugin-react-hot-reload");

module.exports = {
  plugins: [
    {
      plugin: reactHotReloadPlugin
    }
  ],
  webpack: {
    alias: {
      "~": path.resolve(__dirname, "src/")
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "~/(.*)": "<rootDir>/src/$1"
      }
    }
  }
};
