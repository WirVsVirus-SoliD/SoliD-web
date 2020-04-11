import { createMuiTheme } from "@material-ui/core/styles";

/**
 * Material UI allows configuring its color palette using the
 * `createMuiTheme` function.
 *
 * All values are taken from the `tailwind.config.js` file.
 */
export const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#94E1AE",
      main: "#199057",
      dark: "#197649"
    }
  }
});
