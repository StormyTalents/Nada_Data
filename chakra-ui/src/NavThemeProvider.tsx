import React from 'react';
import { ThemeProvider } from 'styled-components';

import { lighten, MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@nobrainerlabs/react-material-ui';

const NavThemeProvider: React.FC = (props) => {
  const { children } = props;
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#507768',
        dark: '#385348',
      },
      text: {
        primary: '#222D3D',
        secondary: lighten('#222D3D', 0.54),
        disabled: lighten('#222D3D', 0.26),
        hint: lighten('#222D3D', 0.38),
      },
    },
    typography: {
      h1: {
        fontFamily: 'Poppins',
        fontWeight: 300,
        fontSize: 96,
        lineHeight: '117%',
        letterSpacing: -1.5,
      },
      h2: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 60,
        lineHeight: '120%',
        letterSpacing: -0.5,
      },
      h3: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 48,
        lineHeight: '117%',
      },
      h4: {
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: 32,
        lineHeight: '123.5%',
        letterSpacing: 0.25,
      },
      h5: {
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: 24,
        lineHeight: '133.4%',
      },
      h6: {
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: 20,
        lineHeight: '160%',
        letterSpacing: 0.15,
      },
      subtitle1: {
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: 18,
        lineHeight: '175%',
        letterSpacing: 0.15,
      },
      subtitle2: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '157%',
        letterSpacing: 0.1,
      },
      body1: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: '150%',
        letterSpacing: 0.15,
      },
      body2: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '143%',
        letterSpacing: 0.15,
      },
      caption: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 12,
        lineHeight: '100%',
        letterSpacing: 0.4,
      },
      overline: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 12,
        lineHeight: '266%',
        letterSpacing: 1,
        transform: 'uppercase',
      },
    },
    overrides: {
      MuiListItem: {
        root: {
          '&.active': { backgroundColor: lighten('#507768', 0.9) },
        },
      },
    },
  });
  return (
    // Use the theme in the ThemeProvider for Material-UI so styles are
    // applied to the Material-UI components
    <MuiThemeProvider theme={theme}>
      {/* Use also the ThemeProvider for Styled-Components so //you can access
        the theme in your own css */}
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </MuiThemeProvider>
  );
};

export default NavThemeProvider;
