import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/libs/ui/theme';
import { Be_Vietnam_Pro } from 'next/font/google';
import Navbar from '@/libs/ui/components/Navbar';
import { CssBaseline } from '@mui/material';

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
            <Navbar />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
