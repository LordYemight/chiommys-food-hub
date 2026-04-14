import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const heading = Sora({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  weight: ["400", "600", "700", "800"]
});

const body = Inter({ 
  subsets: ["latin"], 
  variable: "--font-body" 
});

export const metadata: Metadata = {
  title: "Chiommys Food Hub | The Heart of Port Harcourt",
  description: "Premium culinary destination specializing in hygienic processing and authentic homemade meals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}