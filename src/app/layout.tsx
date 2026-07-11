import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prathamesh Ethiraj | Full Stack Developer — React, Next.js, Node.js",
  description:
    "Professional portfolio of Prathamesh Ethiraj — Full Stack Developer with 4+ years building enterprise web apps & financial software. Expert in React.js, Next.js, Node.js, .NET Core, AWS.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Financial Software",
    ".NET Core",
    "Prathamesh Ethiraj",
    "Freelance Developer",
    "Mumbai Developer",
  ],
  authors: [{ name: "Prathamesh Ethiraj" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Prathamesh Ethiraj | Full Stack Developer",
    description:
      "Building enterprise-grade web applications, financial software & scalable APIs. Available for freelance projects.",
    type: "website",
    locale: "en_IN",
    siteName: "Prathamesh Ethiraj Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prathamesh Ethiraj | Full Stack Developer",
    description:
      "Building enterprise-grade web applications, financial software & scalable APIs.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030712",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${firaCode.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
