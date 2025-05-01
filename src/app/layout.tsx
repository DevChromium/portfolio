import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Lucas Pauwels | Software Engineer",
  description: "Discover the portfolio of Lucas Pauwels, a passionate web developer specializing in creating responsive, user-centric websites and applications. Explore my projects, skills, and expertise in front-end and back-end development.",
  keywords: ["web developer portfolio", "front-end developer", "comsa", "codewolf", "back-end developer", "JavaScript developer", "React portfolio", "Next.js portfolio", "Lucas Pauwels portfolio", "web design", "responsive websites", "full-stack developer", "web development projects"],
  authors: [{ name: "Lucas Pauwels" }],
  creator: "Lucas Pauwels",
  robots: "index, follow",
  openGraph: {
    title: "Lucas Pauwels | Software Engineer",
    description: "Discover the portfolio of Lucas Pauwels, a passionate web developer specializing in creating responsive, user-centric websites and applications. Explore my projects, skills, and expertise in front-end and back-end development.",
    url: "https://www.chrm.dev",
    siteName: "Lucas Pauwels' Portfolio",
    type: "website",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-pink-300 selection:text-pink-900`}
      >
        {children}
      </body>
    </html>
  );
}
