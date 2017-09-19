import { createMuiTheme } from 'material-ui/styles';


/**
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */
export default createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
  typography: {
    // Nav style
    "display1": {
      "fontSize": 12,
      "fontWeight": "bold",
      "color": "rgba(0, 0, 0, 0.87)",
      "lineHeight": "20px",
      "textAlign": "center",
      "textTransform": "uppercase"
    },
    "display2": {
      "fontSize": 13,
      "fontWeight": "inherit",
      "color": "rgba(0, 0, 0, 0.38)",
      "lineHeight": "20px",
      "textTransform": "normal"
    },
    "display3": {
      "fontSize": 13,
      "fontWeight": "inherit",
      "color": "#F36F6F",
      "lineHeight": "20px",
      "textTransform": "uppercase"
    },
    "display4": {
      "fontSize": 13,
      "fontWeight": "bold",
      "color": "rgba(0, 0, 0, 0.87)",
      "textTransform": "uppercase",
      "textAlign": "center"
    },
    "button": {
      "fontSize": 14,
      "fontWeight": "bold",
      "letterSpacing": 1,
    }
  },
  
  
});