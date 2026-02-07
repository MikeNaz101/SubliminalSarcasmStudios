import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mike Nasierowski | Game Developer & CS Student",
  description: "Portfolio of Mike Nasierowski, a software engineer and game developer specializing in Unity, Unreal Engine, and Full Stack Web Development.",
  keywords: ["Game Development", "Unity", "Unreal Engine", "Software Engineer", "Mike Nasierowski"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}