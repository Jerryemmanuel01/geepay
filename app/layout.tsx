import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Geepay - Centralized Peer Contribution",
  description:
    "Manage your collective contributions with transparency and ease.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased selection:bg-secondary selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
