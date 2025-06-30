import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'

const monaSans = localFont({
  src: '../public/fonts/MonaSans-Bold.ttf',
})

export const metadata: Metadata = {
  title: "Bar Recipes",
  description: "A collection of delicious bar recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${monaSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
