import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';

import { APP_NAME } from '@/lib/constants';
import { ToastContainer } from 'react-toastify';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Connect with other people and share your thoughts with them.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-sm text-slate-900 bg-slate-200 min-h-screen`}
      >
        {children}

        <ToastContainer theme="dark" />
      </body>
    </html>
  );
}
