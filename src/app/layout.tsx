import type { Metadata } from 'next';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ReactQueryProvider, StoreProvider } from '@/libs/providers';

import { Message } from '@/libs/ui';

import theme from '@/libs/ui/theme';

export const metadata: Metadata = {
  title: 'Design ITUS Admin',
  description: 'Admin page for Design ITUS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <ReactQueryProvider>
          <StoreProvider>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
                <Message />
              </ThemeProvider>
            </AppRouterCacheProvider>
          </StoreProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
