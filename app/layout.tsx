import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import RoleToggle from "@/src/components/dev/RoleToggle";
import ThemeProvider from "@/src/components/layout/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "منصة تنموي | لوحة التحكم",
  description: "المنصة الذكية لتطوير الكيانات والمجتمعات التنموية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <RoleToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}

