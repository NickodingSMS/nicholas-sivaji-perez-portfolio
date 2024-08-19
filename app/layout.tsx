import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "./TopBar"; // Adjust the path if necessary

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nicholas Sivaji Perez Portfolio",
  description: "Portfolio site created with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{  
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-900 text-gray-200`}>
        <TopBar />
        <main className="">{children}</main>
      </body>
    </html>
  );
}
