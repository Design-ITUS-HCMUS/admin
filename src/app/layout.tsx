import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import theme from '@/libs/ui/theme';

const beVietnamPro = Be_Vietnam_Pro({
  display: 'swap',
  weight: '400',
  subsets: ['vietnamese'],
});

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
    <html lang='en' className={beVietnamPro.className}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
