import React from 'react';
import { ThemeProvider } from 'styled-components';

import lightblue from '@material-ui/core/colors/lightBlue';
import {
  lighten,
  MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
// import { createMuiTheme } from '@nobrainerlabs/react-material-ui';
import { createTheme } from '@material-ui/core/styles';

const AppThemeProvider: React.FC = (props) => {
  const { children } = props;
  const breakpoints = createBreakpoints({
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 960,
      xl: 1024,
    },
  });
  const theme = createTheme({
    breakpoints,
    palette: {
      primary: {
        main: '#507768',
        dark: '#385348',
        light: '#94C6AF',
        contrastText: '#fff',
      },
      secondary: {
        light: '#F4F8F8',
        dark: '#000000',
        main: '#94C6AF',
        contrastText: '#fff',
      },
      text: {
        primary: '#222D3D',
        secondary: lighten('#222D3D', 0.54),
        disabled: lighten('#222D3D', 0.26),
        hint: lighten('#222D3D', 0.38),
      },
      background: {
        default: '#fff',
      },
      error: {
        main: '#CA270E',
      },
    },

    typography: {
      h1: {
        fontFamily: 'Tommy',
        fontWeight: 300,
        fontSize: 96,
        lineHeight: '117%',
        letterSpacing: -1.5,
      },
      h2: {
        fontFamily: 'Tommy',
        fontWeight: 400,
        fontSize: 60,
        lineHeight: '120%',
        letterSpacing: -0.5,
      },
      h3: {
        fontFamily: 'Tommy',
        fontWeight: 400,
        fontSize: 48,
        lineHeight: '117%',
      },
      h4: {
        fontFamily: 'Tommy',
        fontWeight: 500,
        fontSize: 32,
        lineHeight: '123.5%',
        letterSpacing: 0.25,
      },
      h5: {
        fontFamily: 'Tommy',
        fontWeight: 500,
        fontSize: 24,
        lineHeight: '133.4%',
      },
      h6: {
        fontFamily: 'Tommy',
        fontWeight: 500,
        fontSize: 20,
        lineHeight: '160%',
        letterSpacing: 0.15,
      },
      subtitle1: {
        fontFamily: 'Tommy',
        fontWeight: 500,
        fontSize: 18,
        lineHeight: '175%',
        letterSpacing: 0.15,
      },
      subtitle2: {
        fontFamily: 'Tommy',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '157%',
        letterSpacing: 0.1,
      },
      body1: {
        fontFamily: 'Tommy',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '150%',
        letterSpacing: 0.15,
      },
      body2: {
        fontFamily: 'Tommy',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '143%',
        letterSpacing: 0.15,
      },
      caption: {
        fontFamily: 'Tommy',
        fontWeight: 400,
        fontSize: 12,
        lineHeight: '160%',
        letterSpacing: 0.4,
      },
      overline: {
        fontFamily: 'Tommy',
        fontWeight: 400,
        fontSize: 12,
        lineHeight: '266%',
        letterSpacing: 1,
        transform: 'uppercase',
      },
    },
    props: {},
    overrides: {
      MuiListItemIcon: {
        root: {
          minWidth: 36,
        },
      },
      MuiTableRow: {
        hover: {
          cursor: 'pointer',
        },
        root: {
          '&$selected, &$selected:hover': { backgroundColor: lightblue[50] },
        },
      },
      MuiDialog: {
        paper: {
          width: '80%',
        },
      },
      MuiDialogActions: {
        root: {
          padding: '8px 24px',
        },
      },
      MuiButton: {
        root: {
          fontFamily: 'Tommy',
          fontWeight: 500,
          fontSize: 14,
          borderRadius: 18,
          textTransform: 'uppercase',
          '&:disabled': {
            color: lighten('#222D3D', 0.74),
            backgroundColor: lighten('#ECF1F4', 0.62),
          },
        },
        sizeLarge: {
          borderRadius: 21,
        },
        containedPrimary: {
          color: '#fff',
          backgroundColor: '#507768',
          '&:hover': {
            backgroundColor: '#385348',
          },
          containedSecondary: {
            color: '#fff',
            backgroundColor: '#94C6AF',
            '&:hover': {
              backgroundColor: '#50665D',
            },
          },
          outlinedPrimary: {
            color: '#507768',
            '&:hover': {
              backgroundColor: lighten('#507768', 0.9),
            },
          },
          outlinedSecondary: {
            color: '#94C6AF',
            '&:hover': {
              backgroundColor: lighten('#94C6AF', 0.9),
            },
          },
          textPrimary: {
            color: '#507768',
            '&:hover': {
              backgroundColor: lighten('#507768', 0.9),
            },
          },
          textSecondary: {
            color: '#94C6AF',
            '&:hover': {
              backgroundColor: lighten('#94C6AF', 0.9),
            },
          },
        },
      },
    },
  });
  return (
    //Make sure the Material stylesheet is placed above your own
    //styles so you can overwrite them
    <StylesProvider injectFirst>
      {/* Use the theme in the ThemeProvider for Material-UI so //styles are
      applied to the Material-UI components */}
      <MuiThemeProvider theme={theme}>
        {/* Use also the ThemeProvider for Styled-Components so //you can access
        the theme in your own css */}
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

export default AppThemeProvider;
