import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IFETO E-Commerce",
  description: "Your shopping from abroad made easier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
