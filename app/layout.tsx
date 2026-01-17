import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/lib/redux/provider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Geepay - Centralized Peer Savings",
  description:
    "Manage your collective savings with transparency and ease.",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased selection:bg-secondary selection:text-white`}
      >
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-right" />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
