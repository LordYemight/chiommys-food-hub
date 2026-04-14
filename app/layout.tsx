import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import './globals.css';

const heading = Sora({ subsets: ['latin'], variable: '--font-heading' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'Chiommys Food Hub | Port Harcourt Food & Exotic Seafood',
  description: 'Premium food hub specializing in hygienic processing, authentic homemade meals, and export-quality exotic seafood.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}