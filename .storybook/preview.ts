import type { Preview, ReactRenderer } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { CssBaseline, ThemeProvider } from '@mui/material';
// import { lightTheme, darkTheme } from '../src/themes'; // Import your custom theme configs

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true, // Adds the description and default columns
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    withThemeFromJSXProvider<ReactRenderer>({
      // themes: {
      //   light: lightTheme,
      //   dark: darkTheme,
      // },
      defaultTheme: 'light',
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    }),
  ],
};

export default preview;
